# DNS migration: ephratachiropractorfamilytree.com

Public DNS inventory captured 2026-08-18 before moving DNS from Inception Websites to GoDaddy.

## Completion status

Completed 2026-08-18:

- Nameservers changed to `ns63.domaincontrol.com` and `ns64.domaincontrol.com`.
- Permanent 301 forwarding enabled to `https://ephratachiropractic.com`.
- All five Google Workspace MX records restored.
- SPF, Google DKIM, DMARC, and both Google verification records restored.
- Verified both root and `www` redirects over HTTP and HTTPS.
- Verified the new DNS records directly against GoDaddy's authoritative nameservers.

Final manual check remaining: send and reply to a test email at an active `@ephratachiropractorfamilytree.com` mailbox.

## Records to preserve in GoDaddy

Use GoDaddy's default TTL (1 hour) for each record.

### Google Workspace mail delivery (required)

| Type | Name | Priority | Value |
|---|---|---:|---|
| MX | `@` | 1 | `ASPMX.L.GOOGLE.com` |
| MX | `@` | 5 | `ALT1.ASPMX.L.GOOGLE.com` |
| MX | `@` | 5 | `ALT2.ASPMX.L.GOOGLE.com` |
| MX | `@` | 10 | `ALT3.ASPMX.L.GOOGLE.com` |
| MX | `@` | 10 | `ALT4.ASPMX.L.GOOGLE.com` |

These legacy Google Workspace MX records are currently active and working. Google still supports them.

### Email authentication (required)

| Type | Name | Value |
|---|---|---|
| TXT | `@` | `v=spf1 ip4:52.0.54.202 include:relay.mailchannels.net include:_spf.google.com -all` |
| TXT | `google._domainkey` | `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtH97uKEPjKBEtw2e/rq7sCOueQO4xoxjRNg35qquuBEFPCn65ltGLRc6TO1/uReE2qkTyGY1l571niWRO47xPN376BhFgv4AD1K0cIqf7gYTCk2+YqC4owSlv6OhMOfS+2hEaAnUzBP7iUY+NRmMKkgYdZHjjpyVTiVrJG8vODKp8YfzyhEiNcvW/WJiH0/slOkyDPrt1L2SXUIsScUsz3cweWLqVUNxXp1q4Mrw7KIpz/L1qiV9EeHoqj1S9c2OTMlFPRazUqTfvfMl6q+f2IURgy3nl0BbVa6LNwheH4gtP31zOHQbBRCs7lnKmOlD8OzGYTstyN+4S99rhCoWZwIDAQAB` |
| TXT | `_dmarc` | `v=DMARC1;p=none;sp=none;adkim=r;aspf=r;pct=100;fo=1;rf=afrf;ri=86400;rua=mailto:luke@ephratachiropractorfamilytree.com,mailto:dmarc-reports@ephratachiropractorfamilytree.com;ruf=mailto:luke@ephratachiropractorfamilytree.com,mailto:dmarc-reports@ephratachiropractorfamilytree.com` |

Initially copy the SPF value exactly. After the old Inception hosting is retired, if Google Workspace is the only service sending mail for this domain, simplify SPF to `v=spf1 include:_spf.google.com ~all` after confirming no website form or third-party sender uses the domain.

### Google ownership verification (recommended)

| Type | Name | Value |
|---|---|---|
| TXT | `@` | `google-site-verification=ZPRx8qMUwpa_xX2bb_918HXzNMqd1aRE6Q3K2oJ-Kcg` |
| TXT | `@` | `google-site-verification=sYqZNaP1F9gAop5Ri7wJwlR19raN-124ds2LgeGLgn4` |

Preserve both so existing Google services and Search Console verification remain intact.

## Old Inception/cPanel records not needed for the redirect

These records point to the retiring Inception server `52.0.54.202` or support its cPanel services. Do not recreate them unless an old cPanel mailbox, calendar, FTP account, or other cPanel service is intentionally being retained:

- Root website A record and `www` alias
- `mail`, `webmail`, `autodiscover`, `autoconfig`, `ftp`, `cpanel`, `whm`, `webdisk`, `cpcontacts`, and `cpcalendars`
- `_autodiscover._tcp`, `_caldav._tcp`, `_caldavs._tcp`, `_carddav._tcp`, and `_carddavs._tcp`
- `default._domainkey` (the old cPanel mail-server DKIM key)
- `_cpanel-dcv-test-record` and `_acme-challenge` (old-host certificate validation)

## Migration order

1. Keep this record sheet open.
2. Allow GoDaddy forwarding to switch the domain to GoDaddy nameservers.
3. As soon as GoDaddy DNS becomes editable, add all required and recommended records above.
4. Configure permanent 301 forwarding to `https://ephratachiropractic.com/`.
5. Verify MX, SPF, DKIM, DMARC, inbound email, outbound email, and all four web variants.

Because the old Inception nameserver TTL is 24 hours, some resolvers may use the old DNS during propagation while others use GoDaddy. Add the records immediately when GoDaddy enables editing.
