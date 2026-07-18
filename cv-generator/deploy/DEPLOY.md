# Deploy CVTurbo na Hetzner — krok po kroku

Zakładam: VPS z Ubuntu/Debian (ten od portalu), dostęp SSH jako root/sudo,
domena kupiona. Czas: ~30 minut.

## 0. DNS (u rejestratora domeny)

Rekord `A`: `TWOJA-DOMENA.pl` → IP VPS-a. Opcjonalnie `A` dla `www`.
Propagacja: zwykle minuty, max kilka godzin.

## 1. Node.js na serwerze (jeśli brak — sprawdź: `node --version`, wymagane 18+)

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt-get install -y nodejs
```

## 2. Wgranie plików (z Windows, PowerShell w katalogu repo)

```powershell
scp -r cv-generator root@IP-SERWERA:/var/www/cvturbo
```

Na serwerze:

```bash
sudo chown -R www-data:www-data /var/www/cvturbo
cd /var/www/cvturbo/tools && sudo -u www-data npm install --omit=dev
```

## 3. Konfiguracja serwera AI

```bash
sudo mkdir -p /etc/cvturbo
sudo nano /etc/cvturbo/ai.env      # wklej zmienne wg wzoru w cvturbo-ai.service
sudo chmod 600 /etc/cvturbo/ai.env
sudo cp /var/www/cvturbo/deploy/cvturbo-ai.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now cvturbo-ai
systemctl status cvturbo-ai        # ma być "active (running)"
curl http://127.0.0.1:4141/api/health
```

## 4. nginx

```bash
sudo cp /var/www/cvturbo/deploy/nginx-cvturbo.conf /etc/nginx/sites-available/cvturbo
sudo nano /etc/nginx/sites-available/cvturbo    # podmień TWOJA-DOMENA.pl (2×)
sudo ln -s /etc/nginx/sites-available/cvturbo /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 5. SSL (certbot)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d TWOJA-DOMENA.pl -d www.TWOJA-DOMENA.pl
```

## 6. Konfiguracja frontu — PRZED wgraniem (albo popraw i wgraj ponownie)

- `js/leads.js` → `CVTURBO_CONFIG`: `aiEndpoint: ''` (pusty = ta sama domena,
  przez proxy nginx), `supabaseUrl`, `supabaseAnonKey`, linki Stripe,
  `plausibleDomain` (jeśli włączasz analitykę)
- `tools/build-kraje.js` + `tools/build-zawody.js` → `BASE_URL` na domenę,
  potem `npm run build-seo` i wgraj ponownie
- `robots.txt` → adres sitemap na domenę

## 7. Aktualizacje (kolejne wersje)

```powershell
scp -r cv-generator root@IP-SERWERA:/var/www/cvturbo    # nadpisze pliki
```

```bash
sudo systemctl restart cvturbo-ai    # tylko gdy zmieniał się ai-server.js
```

## 8. Checklista po deployu

- [ ] https://TWOJA-DOMENA.pl działa z kłódką
- [ ] /api/health zwraca ok przez domenę
- [ ] Import CV / Tłumacz działają (z flagą PRO)
- [ ] Test leada — rekord pojawia się w Supabase
- [ ] Search Console: dodaj domenę + zgłoś sitemap.xml
