terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "3.91.0"
    }
  }
}
 
provider "azurerm" {
  features {}
  subscription_id = "3af0f5b2-c721-42d7-96ab-0831a6f67bab"
  tenant_id                  = "b295a2ad-c89a-46e0-ba7f-fcffc56125b5"
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
resource "azurerm_virtual_network" "Vnet" {
  name                = "Inspire-Great-Vnet-IAC"
  address_space       = ["10.0.0.0/16"]
  location            = "UK South"
  resource_group_name = data.azurerm_resources.rg1.resource_group_name
}
 
resource "azurerm_subnet" "subnet" {
  name                 = "Inspo-Greatness-Subnet34"
  resource_group_name  = data.azurerm_resources.rg1.resource_group_name
  virtual_network_name = azurerm_virtual_network.Vnet.name
  address_prefixes     = ["10.0.2.0/24"]
}
 
resource "azurerm_network_interface" "nic" {
  name                = "Inspo-NIC"
  location            = "UK South"
  resource_group_name = data.azurerm_resources.rg1.resource_group_name
ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
  }
 
}
 
resource "azurerm_windows_virtual_machine" "VM" {
  name                = "piG-VM-IAC"
  resource_group_name = data.azurerm_resources.rg1.resource_group_name
  location            = "UK South"
  size                = "Standard_B2s"
  admin_username      = "Inspire-Greatness"
  admin_password      = "Pa55word12345"
  network_interface_ids = [
    azurerm_network_interface.nic.id,
  ]
 
  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }
 
 
  source_image_reference {
    publisher = "MicrosoftWindowsServer"
    offer     = "WindowsServer"
    sku       = "2022-Datacenter"
    version   = "latest"
  }
}
 
resource "azurerm_managed_disk" "disk" {
  name                 = "Insp0GreatnessDiskIAC"
  location             = "UK South"
  resource_group_name  = data.azurerm_resources.rg1.resource_group_name
  storage_account_type = "Standard_LRS"
  create_option        = "Empty"
  disk_size_gb         = 512
}
 
resource "azurerm_virtual_machine_data_disk_attachment" "attach" {
  managed_disk_id    = azurerm_managed_disk.disk.id
  virtual_machine_id = azurerm_windows_virtual_machine.VM.id
  lun                = "0"
  caching            = "ReadWrite"
}