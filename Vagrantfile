# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  config.vm.define :cdda_linux do |config|

    config.vm.hostname = "#{`hostname`[0..-2]}-cdda"
    config.vm.box = "centos/7"

    config.vm.synced_folder "./", "/vagrant", disabled: true  # disable default share
    config.vm.synced_folder "./", "/cdda", owner: "vagrant"

    config.ssh.insert_key = false
    # config.ssh.private_key_path = "~/.vagrant.d/insecure_private_key"
    config.ssh.private_key_path = [ '~/.vagrant.d/insecure_private_key', '~/.ssh/id_rsa' ]
    config.ssh.forward_agent = true
    # Provider-specific configuration so you can fine-tune various
    # backing providers for Vagrant. These expose provider-specific options.
    # Example for VirtualBox:
    #
    config.vm.provider "virtualbox" do |vb|
      #   # Display the VirtualBox GUI when booting the machine
      #   # vb.gui = true

      # Customize the amount of memory on the VM:
      vb.memory = "4096"

      # Customize the amount of CPUs on the VM:
      vb.cpus = 4

      #   # Customize the hard drive size:
      #   spare_disk = File.realpath( "." ).to_s + "/disk-500GB.vdi"

      #   # if ARGV[0] == "up" && ! File.exist?(main_disk)
      #   #     vb.customize [
      #   #         'createhd',
      #   #         '--filename', main_disk,
      #   #         '--format', 'VDI',
      #   #         '--size', 100 * 1024 # 100 GB
      #   #     ]
      #   # end

      #   # vb.customize [
      #   #     'storageattach', :id,
      #   #     '--storagectl', 'SATA',
      #   #     '--port', 0, '--device', 0,
      #   #     '--type', 'hdd', '--medium', main_disk
      #   # ]

      #   if (ARGV[0] == "up" || ARGV[0] == "reload") && ! File.exist?(spare_disk)
      #       vb.customize [
      #           'createhd',
      #           '--filename', spare_disk,
      #           '--format', 'VDI',
      #           '--size', 500 * 1024 # 500 GB
      #       ]
      #   end

      #   vb.customize [
      #       'storageattach', :id,
      #       '--storagectl', 'SATA',
      #       '--port', 1, '--device', 0,
      #       '--type', 'hdd', '--medium', spare_disk
      #   ]

    end
  end
end
