NOTE: The MUI X License Key more than likely isn't going to work. It will have expired. The lifetime license key should... well... last forever...

MUI X License Key (from https://mui.com):
61628ce74db2c1b62783a6d438593bc5Tz1NVUktRG9jLEU9MTY4MzQ0NzgyMTI4NCxTPXByZW1pdW0sTE09c3Vic2NyaXB0aW9uLEtWPTI=
Order Number: MUI-Doc
Expiry Timestamp: 1683447821284(Sun May 7th 08:32:41)
Scope: Premium
Licensing Model: Subscription
Key Version: 2

Lifetime License Key:
e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y
Order Number: 0
Expiry Timestamp: 32472144000000(2999-01-01)
Scope: Premium
Licensing Model: Perpetual
Key Version: 2

// JavaScript KeyGen, designed to be put in an app and run on load.
import { md5 } from '@mui/x-license-pro/encoding/md5';
import { LicenseInfo } from '@mui/x-license-pro';
import { LICENSE_SCOPES } from '@mui/x-license-pro/utils/licenseScope';
import { LICENSING_MODELS } from '@mui/x-license-pro/utils/licensingModel';

let orderNumber = '';
let expiryTimestamp = Date.now(); // Expiry is based on when the package was created, ignored if perpetual license
let scope = LICENSE_SCOPES[1]; // 'pro' or 'premium'
let licensingModel = LICENSING_MODELS[0]; // 'perpetual', 'subscription'
let licenseInfo = `O=${orderNumber},E=${expiryTimestamp},S=${scope},LM=${licensingModel},KV=2`;
LicenseInfo.setLicenseKey(md5(btoa(licenseInfo)) + btoa(licenseInfo));