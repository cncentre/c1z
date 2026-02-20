# ☁️ Cloud Infrastructure Operations & Troubleshooting Guide

Welcome to the **cncentre (c1z.com)** cloud operations knowledge base. This document contains practical guides, troubleshooting steps, and best practices for managing enterprise cloud environments, specifically focusing on Oracle Cloud and Google Cloud Platform (GCP).

## 1. Oracle Cloud: Recovering Lost SSH Private/Public Keys
Losing access to your compute instance due to misplaced SSH keys is a common but critical issue. Here is the standard recovery procedure for Oracle Cloud Infrastructure (OCI) without deleting your boot volume.

### Prerequisites
* Access to the OCI Web Console.
* A secondary (temporary) compute instance in the same Availability Domain.

### Recovery Steps
1. **Stop the Target Instance:** Navigate to your OCI console, locate the instance you are locked out of, and gracefully stop it.
2. **Detach the Boot Volume:** Once stopped, go to the "Boot Volumes" section of the instance details and detach the boot volume.
3. **Attach to Temporary Instance:** Go to your temporary helper instance. Under "Attached Block Volumes", attach the volume you just detached as a *Paravirtualized* volume.
4. **Mount and Modify:**
   * SSH into your helper instance.
   * Identify the attached volume (usually `/dev/sdb` or similar using `lsblk`).
   * Mount the volume to a temporary directory: `sudo mount /dev/sdb3 /mnt` (partition number may vary).
   * Navigate to the authorized keys file: `nano /mnt/home/opc/.ssh/authorized_keys` (replace `opc` with `ubuntu` if applicable).
   * **Insert your new public key** into this file and save.
5. **Unmount and Reattach:**
   * Unmount the volume: `sudo umount /mnt`.
   * Detach it from the helper instance via the OCI console.
   * Reattach it to your original instance as the Boot Volume.
6. **Restart and Verify:** Start the original instance and SSH using your newly generated private key.

---

## 2. Google Cloud Platform (GCP): Provisioning AMD Instances in Oregon (`us-west1`)
Optimizing compute resources is essential for non-profit open-source infrastructure. AMD EPYC™ processors on GCP offer excellent price-to-performance ratios. Here is how to efficiently provision these in the Oregon region.

### Why `us-west1` (Oregon)?
The `us-west1` region is known for its lower carbon footprint and generally competitive pricing for outbound data transfer, making it ideal for hosting open-source mirrors and documentation.

### Provisioning Steps via gcloud CLI
To quickly spin up an N2D (AMD-based) machine type instead of using the graphical console, you can use the following command. This ensures your deployment is scriptable and repeatable.

```bash
gcloud compute instances create c1z-open-source-node-1 \
    --project=YOUR_PROJECT_ID \
    --zone=us-west1-b \
    --machine-type=n2d-standard-2 \
    --image-family=debian-11 \
    --image-project=debian-cloud \
    --boot-disk-size=30GB \
    --boot-disk-type=pd-ssd \
    --tags=http-server,https-server
