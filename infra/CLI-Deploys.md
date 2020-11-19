<!-- Validate Template -->

az deployment group validate \
--resource-group dhoek-gsm-rg \
--template-file manager-server/template.json \
--parameters @manager-server/parameters.json

<!-- Run Template -->

az deployment group create \
--resource-group dhoek-gsm-rg \
--template-file manager-server/template.json \
--parameters @manager-server/parameters.json
