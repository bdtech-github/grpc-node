// @ts-ignore
import path from 'path'
import {ChannelCredentials, ServerCredentials} from "@grpc/grpc-js";
import * as fs from "fs";

export class SSLService {
    static getServerCredentials(): ServerCredentials {
        const serverCert = fs.readFileSync(path.resolve(__dirname, '../../ssl/server-cert.pem'));
        const serverKey = fs.readFileSync(path.resolve(__dirname, '../../ssl/server-key.pem'));

        const serverCredentials = ServerCredentials.createSsl(
            null,
            [
                {
                    cert_chain: serverCert,
                    private_key: serverKey,
                },
            ],
            false
        );

        return serverCredentials;
    }

}
