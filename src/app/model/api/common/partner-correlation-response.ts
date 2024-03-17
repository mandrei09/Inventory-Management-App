export class PartnerCorrelationResponse {
    cod: number;
    message: string;
    found: [
        {
            cui: string,
            data: string,
            denumire: string,
            adresa: string,
            scpTVA: true,
            data_inceput_ScpTVA: string,
            data_sfarsit_ScpTVA: string ,
            data_anul_imp_ScpTVA: string ,
            mesaj_ScpTVA: string,
            dataInceputTvaInc: string,
            dataSfarsitTvaInc: string,
            dataActualizareTvaInc: string,
            dataPublicareTvaInc: string,
            tipActTvaInc: string,
            statusTvaIncasare: boolean,
            dataInactivare: string ,
            dataReactivare: string ,
            dataPublicare: string ,
            dataRadiere:  string,
            statusInactivi: boolean,
            dataInceputSplitTVA:  string,
            dataAnulareSplitTVA: string,
            statusSplitTVA: boolean,
            iban: string,
        }
    ];
    // notfound: []
}