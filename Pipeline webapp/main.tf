terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "3.91.0"
    }
  }
}
 
provider "azurerm" {
  skip_provider_registration = true 
  features {
  }
}
 
data "azurerm_resources" "rg1" {  
    resource_group_name = "rg-uks-velocity-team2-001"
}

 
resource "azurerm_windows_web_app" "azure_wp" {
  name                = "piepeline-deployment-app"
  location            = "Uk South"
  resource_group_name = data.azurerm_resources.rg1.resource_group_name
  service_plan_id = "/subscriptions/3af0f5b2-c721-42d7-96ab-0831a6f67bab/resourceGroups/rg-uks-velocity-team2-001/providers/Microsoft.Web/serverFarms/ASP-rguksvelocityteam2001-bc7d"
 
  site_config {
    always_on = false
    application_stack {
      current_stack = "dotnet"
      dotnet_version = "v8.0"
    }
  }

}
