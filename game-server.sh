#!/bin/bash

# Ports: 7777,27015,15000,27102,27131

PS3='Please enter your choice: '
options=("Mordhau" "Sandstorm" "Update" "Set Config" "Install" "Quit")
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
        "Set Config")
        mkdir -p ~/game-server/mordhau/Mordhau/Saved/Config/LinuxServer
        touch ~/game-server/mordhau/Mordhau/Saved/Config/LinuxServer/Game.ini
        cat <<EOT > ~/game-server/mordhau/Mordhau/Saved/Config/LinuxServer/Game.ini
[/Script/Mordhau.MordhauGameMode]
MOTDURL=
bIsThirdPersonCameraDisabled=False
ConstrainAspectRatio=0.000000
bIsHitStopOnTeamHitsDisabled=False
bDisableClientMods=False
PlayerRespawnTime=5.000000
AutoKickOnTeamKillAmount=5
BallistaRespawnTime=30.000000
CatapultRespawnTime=30.000000
HorseRespawnTime=30.000000
DamageFactor=1.000000
TeamDamageFactor=0.500000
TeamDamageFlinch=0
MapRotation=FFA_ThePit
MapRotation=TDM_Camp
MapRotation=SKM_Grad
MapRotation=FFA_Contraband
MapRotation=TDM_Tourney
MapRotation=SKM_MountainPeak
MapRotation=FFA_Crossroads
MapRotation=TDM_Taiga
MapRotation=SKM_Feitoria
MapRotation=FFA_Castello
MapRotation=TDM_Arena
MapRotation=SKM_Truce
MapRotation=FFA_Camp
MapRotation=TDM_Grad
MapRotation=SKM_ThePit
MapRotation=FFA_Tourney
MapRotation=TDM_MountainPeak
MapRotation=SKM_Contraband
MapRotation=FFA_Taiga
MapRotation=TDM_Feitoria
MapRotation=SKM_Crossroads
MapRotation=FFA_Arena
MapRotation=TDM_Truce
MapRotation=SKM_Castello
MapRotation=FFA_Grad
MapRotation=TDM_ThePit
MapRotation=SKM_Camp
MapRotation=FFA_MountainPeak
MapRotation=TDM_Contraband
MapRotation=SKM_Tourney
MapRotation=FFA_Feitoria
MapRotation=TDM_Crossroads
MapRotation=SKM_Taiga
MapRotation=FFA_Truce
MapRotation=TDM_Castello
MapRotation=SKM_Arena

[/Script/Mordhau.MordhauGameSession]
MaxSlots=64
ServerName=SKETCHLAND
ServerPassword=balls
AdminPassword=balls
RconPassword=balls
BannedPlayers=()
MutedPlayers=()
LegacyBannedPlayers=()
LegacyMutedPlayers=()
LegacyAdmins=76561197967479351
LegacyAdmins=76561197996743203
EOT

mkdir -p ~/game-server/sandstorm/Insurgency/Saved/Config/LinuxServer
touch ~/game-server/sandstorm/Insurgency/Saved/Config/LinuxServer/Game.ini
cat <<EOT > ~/game-server/sandstorm/Insurgency/Saved/Config/LinuxServer/Game.ini
[Rcon]
bEnabled=False
Password=password
ListenPort=27015

[/Script/Insurgency.INSGameMode]
bKillFeed=true
TeamKillLimit=100
bKillerInfo=True
bKillerInfoRevealDistance=True

[/Script/Insurgency.INSCoopMode]
MinimumEnemies=6
MaximumEnemies=12
MaxPlayersToScaleEnemyCount=6
AIDifficulty=0.1

EOT
        ;;
        *) echo "invalid option $REPLY";;
    esac
done
