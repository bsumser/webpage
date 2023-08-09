## Table of Contents

- [Description](#description)
- [Tech Stack](#techstack)
- [SSL Cert](#sslcert)
- [Credits](#credits)

## Description

## Tech Stack

The website runs on an AWS EC2 t2.micro instance running Ubuntu.

The server runs Apache as a front proxy for the Node JS backend that handles the website functionality.

For the Zettelkasten notes graph, org-publish is used to generate html files from the org-roam notes that I write.

## SSL Certification

SSL certification aquired by using CertBot and following this [guide](https://certbot.eff.org/instructions?ws=apache&os=ubuntufocal).


## Credits

Thanks to [morhetz](https://github.com/morhetz) for creating the gruvbox color scheme. I use it in almost all the programs on my pc.

Credit to Niklas Luhmann for pioneering the Zettelkasten method for personal knowledge managment. This kind of system always intrigued me
ever since I about the interconnected web of hypercards from Neal Stephenson's book Snow Crash.

[Hugo Cisneros'](https://hugocisneros.com/blog/my-org-roam-notes-workflow/) scripts and method of generating a graph of zettelkasten notes
has been pretty shamefully copied for use. Without his python program for generating a graph json, I don't think I would have been able to get
this working.

[System Crafters](https://systemcrafters.net/publishing-websites-with-org-mode/building-the-site/) org-publish guide was very helpful as well.
