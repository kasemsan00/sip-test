VERCEL_TOKEN=2KNREOkWWK6rbs3nIzKWKJlA
# vercel เข้าระบบก่อน
# npm install -g vercel 
vercel pull --yes --environment=production --token=$VERCEL_TOKEN
vercel build --prod --token=$VERCEL_TOKEN
vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN