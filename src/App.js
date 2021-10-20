import {useWeb3React} from "@web3-react/core"
import {InjectedConnector} from '@web3-react/injected-connector'
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDropzone} from "react-dropzone";
import exportFromJSON from 'export-from-json'
import debounce from "lodash.debounce";

function Connect(activate, active, triedActivate, setTriedActivate) {
    const injected = new InjectedConnector({})

    async function connect() {
        try {
            await activate(injected)
            setTriedActivate(true)
        } catch (ex) {
            console.log(ex)
        }
    }

    if (triedActivate && !active) return (
        <div className={"connect"}>
            <h1>Oh, no Web3 Ethereum wallet installed?</h1>
            <p>
                Sorry, but couldn't connect to your Web3 Ethereum wallet. Make sure it's installed, for example use
                the <a href={"https://metamask.io"}>MetaMask</a> browser plugin..
            </p>
        </div>
    )

    return (
        <div className={"connect"}>
            <h1>Attest with Ethereum</h1>
            <div className={"connect-button"}>
                <button onClick={connect}>Click here to connect your wallet</button>
            </div>
            <p>
                This site, attest-with.eth, allows one or more Ethereum accounts to attest a small amount of text.
            </p>
            <p>
                What's the small amount of text? It could be anything. For example, I could write "My name is X and
                my ethereum account is at 0x9b2055d370f73ec7d8a03e965129118dc8f5bf83" and then sign this with my
                0x9b2055d370f73ec7d8a03e965129118dc8f5bf83 account to which I hold the private key, and thereby attest
                to the statement in the text.
            </p>
            <p>
                While me signing my own statement like that is fine for attesting to the original statement, the real
                power comes when others attest to the same statement. If many other people attest to the same
                statement, it is likely to hold some weight. Of course, this depends on the weight carried against those
                who attest, but these will gain prominence over time as we build a <a
                href={"https://en.wikipedia.org/wiki/Web_of_trust"}>'web of trust.'</a>
            </p>
            <h2>
                Why just a small amount of text?
            </h2>
            <p>
                In theory, you can sign anything, be that some structured JSON or a JPEG or whatever else. But, Web3
                wallets don't allow for users to easily see what they sign unless it's just some small amount of text.
                Taking inspiration from the <a href={"https://login.xyz"}>'Sign in with Ethereum' movement</a>, where a
                small amount of text is signed to let people authenticate themselves, we here do the same by letting
                people sign a small amount of text to attach their signature to this. The structure of the text, if any,
                is application dependent.
            </p>
            <h2>
                All off-chain
            </h2>
            <p>
                There is no need to put everything on a blockchain. In fact, it's likely unwanted as the text you attest
                might hold personal data or other sensitive information. The point is not to put data on-chain, but to
                leverage Web3 technologies and wallets to let people do more than just sign on-chain transactions. When
                attesting a small amount of text, the output can be downloaded as an attest.json file. If you want to
                provide a statement signed with your public Ethereum account, do so and pass the attest.json file on to
                whomever is interested in this attestation. They can then themselves upload the file to attest-with.eth
                to verify the signatures, or do so off-line, and optionally add on their own attestation if they so
                wish.
            </p>
        </div>
    );
}

function Attest(
    active,
    account,
    library,
    connector,
    deactivate,
    content,
    setContent,
    attestations,
    setAttestations,
    verifiedAttestations,
    acceptedFiles,
    openFileUpload,
    getDropZoneRootProps,
    getDropZoneInputProps,
    processing,
    setTriedActivate
) {
    async function disconnect() {
        try {
            setTriedActivate(false)
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }

    async function sign() {
        try {
            const signature = await library.eth.personal.sign(content, account, undefined)
            setAttestations(attestations.filter(a => a.account !== account).concat([{
                account: account,
                signature: signature
            }]))
        } catch (e) {
            console.error(e)
        }
    }

    function download() {
        const data = {
            "comment": "Downloaded from attest-with.eth - Verify at https://attest-with.eth.link",
            "content": content,
            "attestations": verifiedAttestations,
            "version": 1
        }
        const fileName = "attest"
        const exportType = exportFromJSON.types.json
        exportFromJSON({
            data, fileName, exportType
        })
    }

    function attestationTable() {
        return (
            <table>
                <thead>
                <tr>
                    <th>Account</th>
                    <th>Signature</th>
                </tr>
                </thead>
                <tbody>
                {verifiedAttestations.sort((a1, a2) => {
                    if (a1.account < a2.account) return -1
                    else if (a1.account > a2.account) return 1
                    else return 0
                }).map(a => (
                    <tr key={a.account}>
                        <td>{a.account}</td>
                        <td>{a.signature}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }

    function uploadButton() {
        return (
            <span className="upload-button">
                <span {...getDropZoneRootProps({className: 'dropzone'})}>
                    <input {...getDropZoneInputProps()} />
                    <button type="button" onClick={openFileUpload}>
                        Upload attest.json
                    </button>
                </span>
            </span>
        );
    }

    return (
        <div className={"attest"}>
            <h1>Attest with Ethereum</h1>
            <div className={"attest-button"}>
                <button onClick={download}>Download attest.json</button>
                {uploadButton()}
                <button onClick={disconnect}>Disconnect wallet</button>
            </div>
            <label>
                Content to attest
            </label>
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <div className={"attest-button"}>
                <button onClick={sign}>Click to sign with {account}</button>
            </div>
            <div className={"attestations"}>
                {(() => {
                    if (processing) {
                        return (<span className={"processing"}>...</span>)
                    } else if (verifiedAttestations.length === 0) {
                        return (<span>No verified attestations available on above content, click the sign button to add one..</span>)
                    }
                })()}
                {(() => {
                    if (verifiedAttestations.length > 0) return (<label>Content signed by</label>)
                })()}
                {(() => {
                    if (verifiedAttestations.length > 0) return attestationTable()
                })()}
            </div>
        </div>
    );
}

function App() {
    const {active, account, library, connector, activate, deactivate} = useWeb3React()
    const [triedActivate, setTriedActivate] = useState(false)
    const [content, setContent] = useState("Write some text here..")
    const [contentCounter1, setContentCounter1] = useState(0)
    const [contentCounter2, setContentCounter2] = useState(0)
    const [attestations, setAttestations] = useState([])

    const {
        acceptedFiles,
        getRootProps: getDropZoneRootProps,
        getInputProps: getDropZoneInputProps,
        open: openFileUpload
    } = useDropzone({
        accept: 'application/json',
        maxFiles: 1
    });

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            const fr = new FileReader()
            fr.onloadend = () => {
                const loadedJSON = JSON.parse(fr.result)
                setContent(loadedJSON.content || "")
                setAttestations(loadedJSON.attestations || [])
            }
            fr.readAsText(acceptedFiles[0])
        }
    }, [acceptedFiles])

    const delayedSetContentCounter2 = useCallback(debounce(setContentCounter2, 2000), [contentCounter1])

    const setContentWithCounters = (value) => {
        const newCounter = contentCounter1 + 1
        setContentCounter1(newCounter)
        delayedSetContentCounter2(newCounter)
        setContent(value)
    }

    const verifiedAttestations = useMemo(
        () => {
            function verifySignature(content, signer, signature) {
                return library.eth.accounts.recover(content, signature) === signer
            }

            if (contentCounter1 <= contentCounter2)
                return attestations.filter(a => verifySignature(content, a.account, a.signature))
            else return []
        }
        , [attestations, content, contentCounter1, contentCounter2])

    if (active) return Attest(
        active,
        account,
        library,
        connector,
        deactivate,
        content,
        setContentWithCounters,
        attestations,
        setAttestations,
        verifiedAttestations,
        acceptedFiles,
        openFileUpload,
        getDropZoneRootProps,
        getDropZoneInputProps,
        contentCounter1 > contentCounter2,
        setTriedActivate
    )
    else return Connect(activate, active, triedActivate, setTriedActivate)
}

export default App;
