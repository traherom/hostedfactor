dev_env:
	docker-compose -f docker-compose.dev.yml up -d
	cd api && x-terminal-emulator -e "./manage.py runserver"
	cd client && x-terminal-emulator -e "npm start"
