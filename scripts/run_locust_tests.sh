#!/bin/bash

cd ./tests/locust
rm -rf locust_env
python3 -m venv locust_env
pip install -r requirements.txt
source locust_env/bin/activate
locust -f openbmc_test.py --headless --users 10 --spawn-rate 2 --run-time 30s --host=https://localhost:2443
cd ../../