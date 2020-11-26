#!/bin/bash

# Ports: 7777,27015,15000,27102,27131

PS3='Please enter your choice: '
options=("Mordhau" "Sandstorm" "Update" "Install" "Quit")
select opt in "${options[@]}"
do
    case $opt in
        "Mordhau")
            ./game-server/mordhau/MordhauServer.sh 2>&1 | tee log-mordhau.txt
            ;;
        "Sandstorm")
            ./game-server/sandstorm/Insurgency/Binaries/Linux/InsurgencyServer-Linux-Shipping Ministry?Scenario=Scenario_Ministry_Checkpoint_Security?Lighting=Day?MaxPlayers=28?password=balls \
            -Port=27102 \
            -QueryPort=27131 \
            -log \
            -hostname="SKETCHLAND" \
            -mutators=AllYouCanEat \
            -EnableCheats 2>&1 | tee log-insurgency-sandstorm.txt
            ;;
        "Update")
            # Mordhau Server
            ~/game-server/steamcmd.sh +login anonymous +force_install_dir ./mordhau +app_update 629800 +quit

            # Insurgency Sandstorm Server
            ~/game-server/steamcmd.sh +login anonymous +force_install_dir ./sandstorm +app_update 581330 +quit
            ;;
        "Install")
            # Make directory if missing
            mkdir -p ~/game-server;

            # Dependancies for game servers
            sudo apt-get install -y lib32gcc1
            sudo apt-get install -y libfontconfig1 libpangocairo-1.0-0 libnss3 libgconf-2-4 libxi6 libxcursor1 libxss1 libxcomposite1 libasound2 libxdamage1 libxtst6 libatk1.0-0 libxrandr2

            # Steam CMD
            curl -L "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar --directory ~/game-server -zxvf -

            # Mordhau Server
            ~/game-server/steamcmd.sh +login anonymous +force_install_dir ./mordhau +app_update 629800 +validate +quit

            # Insurgency Sandstorm Server
            ~/game-server/steamcmd.sh +login anonymous +force_install_dir ./sandstorm +app_update 581330 +validate +quit

            echo "*****************************"
            echo "Folder Sizes"
            echo "*****************************"
            du -sh ~/game-server/
            du -sh ~/game-server/mordhau
            du -sh ~/game-server/sandstorm
            echo "*****************************"
            echo ""
            echo "*****************************"
            echo "READY TO START GAME SERVERS"
            echo "*****************************"
        ;;
        "Quit")
            break
            ;;
        *) echo "invalid option $REPLY";;
    esac
done
