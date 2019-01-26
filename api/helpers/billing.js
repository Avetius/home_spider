/**
 * Created by sirius on 11/3/17.
 */
const soap = require('strong-soap').soap;
const soapURL = 'https://testpayments.ameriabank.am/webservice/PaymentService.svc?wsdl';

soap.createClient(url, function (err, client) {
    if (err) return console.log(err);
    client.GetPaymentID({
        paymentfields: { // ordering of fields is important
            ClientID: '',
            Description: '',
            OrderID: '',
            Password: '',
            PaymentAmount: '',
            Username: ''
        }
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else if (data['GetPaymentIDResult']['Respcode'] === '1') {
            const redirectURL = `https://testpayments.ameriabank.am/forms/frm_paymentstype.aspx?paymentid=${data['GetPaymentIDResult']['PaymentID']}&lang=en`;
            console.log('Redirect To:', redirectURL);
        } else {
            console.log(data['GetPaymentIDResult']['Respmessage']);
        }
    });
});
