# Attest with Ethereum

The site, [attest-with.eth](https://attest-with.eth.link), allows one or more Ethereum accounts to attest a small amount
of text.

What's the small amount of text? It could be anything. For example, I could write "My name is X and my ethereum account
is at 0x9b2055d370f73ec7d8a03e965129118dc8f5bf83" and then sign this with my 0x9b2055d370f73ec7d8a03e965129118dc8f5bf83
account to which I hold the private key, and thereby attest to the statement in the text.

While me signing my own statement like that is fine for attesting to the original statement, the real power comes when
others attest to the same statement. If many other people attest to the same statement, it is likely to hold some
weight. Of course, this depends on the weight carried against those who attest, but these will gain prominence over time
as we build a ['web of trust.'](https://en.wikipedia.org/wiki/Web_of_trust)

## Why just a small amount of text?

In theory, you can sign anything, be that some structured JSON or a JPEG or whatever else. But, Web3 wallets don't allow
for users to easily see what they sign unless it's just some small amount of text. Taking inspiration from
the ['Sign in with Ethereum' movement](https://login.xyz), where a small amount of text is signed to let people
authenticate themselves, we here do the same by letting people sign a small amount of text to attach their signature to
this. The structure of the text, if any, is application dependent.

## All off-chain

There is no need to put everything on a blockchain. In fact, it's likely unwanted as the text you attest might hold
personal data or other sensitive information. The point is not to put data on-chain, but to leverage Web3 technologies
and wallets to let people do more than just sign on-chain transactions. When attesting a small amount of text, the
output can be downloaded as an ```attest.json``` file. If you want to provide a statement signed with your public
Ethereum account, do so and pass the ```attest.json``` file on to whomever is interested in this attestation. They can
then themselves upload the file to attest-with.eth to verify the signatures, or do so off-line, and optionally add on
their own attestation if they so wish.

## Web app

This repo contains the code for the web app. Beyond serving some static files there is no backend requirements as it's
all done within the browser.

It's a React app, following a typical setup. You can start the app locally with ```npm start```.

## Unlicensed and my motivation for building this

The code in this repo is published as public domain code, mainly because it doesn't do much more than pull together
existing technology in obvious ways. Never before, thanks to blockchain and Web3 wallets, have so many people generated
their own set of public/private keys. We now have a setup where publishing your public key is easier than ever before.
While the reasons why so many people do this is often motivated by short term speculation in cryptocurrencies, it
provides a strong platform on which we can build.

What I would hope this web app adds to the domain is ```attest.json```, a structure for including cryptographic
signatures tied to some content. The structure of ```attest.json``` is simple by design, which is different to some
other efforts out there, like those of [verifiable credentials](https://en.wikipedia.org/wiki/Verifiable_credentials).

Much like the 'Sign in with Ethereum' movement looks to standardize on the signing of simple text for the purpose of
authenticating users of a web app, ```attest.json``` is an attempt at providing a simple structure for attestations.
Hopefully this can help drive the adoption
of [self-sovereign identity](https://en.wikipedia.org/wiki/Self-sovereign_identity).

## ```attest.json```

The ```attest.json``` file contains 4 top level fields:

```comment```: Simply there to add auxiliary detail

```content```: A string of text signed by accounts

```attestations```: An array of zero or more attestations, each attestation consisting of an account and a signature

```version```: attest.json schema version, currently 1

Example ```attest.json```:

```
{
    "comment": "Downloaded from attest-with.eth - Verify at https://attest-with.eth.link",
    "content": "This is an example of attest.json, signed by two different accounts.",
    "attestations": [
        {
            "account": "0x2c89797CC766603812bAe16106633bee446654F5",
            "signature": "0x223c3383a9b6b0a8751fd29c23b87061942f424a787d901a8808e005acf85e8225f6f1be9952b2a8f8a87b19b56df65d587f71c539b3ec0adf2da7a50c9c55271c"
        },
        {
            "account": "0xB68cC68fB8DE5400A281311f4D2bb1591cE26891",
            "signature": "0xeb8ded20441bc9e0d18c8bb3981b0bb1b2228611db4e171424a735b72d83de494c0d1144c382cefa6c826d0ab6e881b1a88150b38fb63917bc0f113e842676661b"
        }
    ],
    "version": 1
}
```
