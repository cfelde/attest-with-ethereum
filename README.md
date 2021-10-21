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
output can be downloaded as an attest.json file. If you want to provide a statement signed with your public Ethereum
account, do so and pass the attest.json file on to whomever is interested in this attestation. They can then themselves
upload the file to attest-with.eth to verify the signatures, or do so off-line, and optionally add on their own
attestation if they so wish.

## Web app

This repo contains the code for the web app. Beyond serving some static files there is no backend requirements as it's
all done within the browser.

It's a React app, following a typical setup. You can start the app locally with ```npm start```
