rm .env
echo AWS_KEY_X=${AWS_KEY} >> .env
echo AWS_SECRET_KEY_X=${AWS_SECRET_ACCESS_KEY} >> .env
sudo sls deploy & wait
rm .env