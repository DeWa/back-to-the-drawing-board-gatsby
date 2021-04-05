---
title: 'UFW Basics'
date: '2020-01-08'
category: 'Linux'
sources:
---

### Install UFW

```shell
sudo apt install ufw
```

### Check UFW status

```shell
sudo ufw status verbose
```

### Connections

By default UFW blocks all incoming traffic and allows all outgoing.

### Enable / Disable UFW

```shell
sudo ufw enable
sudo ufw disable
```

### Allow connections

#### IP address

```shell
sudo ufw allow from 15.15.15.15
```

#### Subnet to specific port

```shell
sudo ufw allow from 15.15.15.0/24 to any port 22
```

#### Service

```shell
sudo ufw allow https
```

#### Port

```shell
sudo ufw allow 25
```

or you allow just tcp/udp

```shell
sudo ufw allow 4422/tcp
```

<br />

### Deny connections

#### IP address

```shell
sudo ufw deny from 15.15.15.51
```

#### Deny outgoing from port

```shell
sudo ufw deny out 25
```

#### Deny to Network interface

```shell
sudo ufw deny in on eth0 from 15.15.15.51
```

#### Port

```shell
sudo ufw allow 25
```

### Reset UFW

You can reset all the rules and disable UFW by

```shell
sudo ufw reset
```
