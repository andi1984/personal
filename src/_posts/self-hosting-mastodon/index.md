---
date: 2025-06-08T00:00:00
title: Self-hosting a Mastodon Instance on a Hetzner Server
template: blogpost.twig
description: A step-by-step guide to running your own Mastodon server on a Hetzner VPS with generic domain names and object storage
---

Running your own Mastodon instance gives you full control over moderation, data storage, and community tone.  This guide walks through the basic steps to deploy Mastodon on a Hetzner virtual server using a generic domain such as `example.social`.

## 1. Prepare the server

1. Provision an Ubuntu 22.04 LTS VPS at your provider of choice.
2. Update packages and install the dependencies listed in the [official installation guide](https://docs.joinmastodon.org/admin/install/#installing-the-last-dependencies):
   ```bash
   sudo apt update && sudo apt upgrade -y
   # install packages as described in the docs
   ```
3. Create a dedicated user and switch to it:
   ```bash
   sudo adduser mastodon
   sudo usermod -aG sudo mastodon
   su - mastodon
   ```

## 2. Install Mastodon

Clone the repository and install Ruby/Node dependencies.

```bash
git clone https://github.com/mastodon/mastodon.git live
cd live
# checkout latest stable tag
git checkout $(git tag -l | grep -v rc | tail -n 1)

# install Ruby gems
gem install bundler
bundle config set deployment 'true'
bundle config set without 'development test'
bundle install

# install JS packages
yarn install --frozen-lockfile
```

## 3. Configure environment variables

Copy the example configuration and adapt it:

```bash
cp .env.production.sample .env.production
```

Edit `.env.production` and set values for your instance:

```env
LOCAL_DOMAIN=example.social

DB_HOST=/var/run/postgresql
DB_USER=mastodon
DB_NAME=mastodon_production
DB_PASS=change-me

REDIS_URL=redis://localhost:6379/1

# Optional: object storage
S3_ENABLED=true
S3_BUCKET=example-bucket
S3_ENDPOINT=https://us-east-1.example-object-storage.com
S3_HOSTNAME=files.example.social
```

## 4. Database and assets

Set up the database and precompile assets:

```bash
RAILS_ENV=production bundle exec rails db:setup
RAILS_ENV=production bundle exec rails assets:precompile
```

> **Tip:** If asset compilation fails due to lack of memory, add swap:
> ```bash
> sudo fallocate -l 2G /swapfile
> sudo chmod 600 /swapfile
> sudo mkswap /swapfile
> sudo swapon /swapfile
> ```

## 5. Systemd services

Create service files for the three Mastodon processes (`mastodon-web`, `mastodon-sidekiq`, `mastodon-streaming`) as documented in the official guide.  After placing the files under `/etc/systemd/system/`, reload and start them:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now mastodon-web mastodon-sidekiq mastodon-streaming
```

You can manually restart them at any time:

```bash
sudo systemctl restart mastodon-web mastodon-sidekiq mastodon-streaming
```

Logs are available via `journalctl`:

```bash
journalctl -u mastodon-web -f
```

## 6. Nginx and TLS

Create an Nginx config in `/etc/nginx/sites-available/mastodon` and link it to `sites-enabled`.
The config should proxy requests for `example.social` to the Mastodon services and optionally expose an alias such as `files.example.social` for object storage.

Enable HTTPS with Let's Encrypt:

```bash
sudo certbot --nginx -d example.social -d files.example.social
```

Certificates renew automatically via a cron job, but you can trigger it manually with `certbot renew`.

## 7. Backups

Combine regular PostgreSQL dumps with [BorgBackup](https://www.borgbackup.org/) to create encrypted, deduplicated archives.

1. Install Borg and initialise a repository on remote storage:
   ```bash
   sudo apt install borgbackup
   export BORG_REPO=ssh://user@backup.example.com/~/mastodon-borg
   borg init --encryption=repokey $BORG_REPO
   ```
2. Create a backup script (`/root/backup-mastodon.sh`):
   ```bash
   #!/bin/bash
   set -euo pipefail
   DATE=$(date +%Y-%m-%d)

   pg_dump --username=postgres --format=c mastodon_production > /tmp/db.dump

   borg create --compression zstd,3 \
     $BORG_REPO::${DATE} \
     /home/mastodon/live/.env.production \
     /tmp/db.dump \
     /home/mastodon/live/public/system

   borg prune --keep-daily=7 --keep-weekly=4 --keep-monthly=12 $BORG_REPO
   rm /tmp/db.dump
   ```
3. Schedule it nightly via cron:
   ```bash
   sudo crontab -e
   0 1 * * * /root/backup-mastodon.sh
   ```

This script dumps the database, backs up configuration and media files, prunes old archives, and removes temporary dumps. Store a `.pgpass` file in `/root` to avoid interactive passwords.

## 8. Automated cleanup

[Ricard Torres](https://ricard.dev/improving-mastodons-disk-usage/) suggests running periodic `tootctl` tasks to purge unused media and cache files. Create `/home/mastodon/cleanup.sh`:

```bash
#!/bin/bash
RAILS_ENV=production /home/mastodon/live/bin/tootctl accounts prune
RAILS_ENV=production /home/mastodon/live/bin/tootctl statuses remove --days 4
RAILS_ENV=production /home/mastodon/live/bin/tootctl media remove --days 4
RAILS_ENV=production /home/mastodon/live/bin/tootctl media remove --remove-headers --include-follows --days 0
RAILS_ENV=production /home/mastodon/live/bin/tootctl preview_cards remove --days 4
RAILS_ENV=production /home/mastodon/live/bin/tootctl media remove-orphans
```

Run it weekly with cron:

```bash
crontab -e
0 3 * * 0 /home/mastodon/cleanup.sh
```

These commands reclaim disk space by pruning remote accounts, old statuses, cached media, and orphaned files.

## 9. Useful links

- [Official Mastodon installation guide](https://docs.joinmastodon.org/admin/install/)
- [Using object storage](https://docs.joinmastodon.org/admin/optional/object-storage/)
- [Object storage proxying](https://docs.joinmastodon.org/admin/optional/object-storage-proxy/)
- [Administration guide](https://github.com/McKael/mastodon-documentation/blob/master/Running-Mastodon/Administration-guide.md)
- [Improving Mastodon's disk usage](https://ricard.dev/improving-mastodons-disk-usage/)

---

With the basics in place, you can now invite users, theme your instance, or automate maintenance tasks. Happy federating!
