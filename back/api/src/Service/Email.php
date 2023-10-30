<?php

namespace App\Service;
use Brevo\Client\Api\TransactionalEmailsApi;
use Brevo\Client\ApiException;
use Brevo\Client\Configuration as BrevoConfiguration;
use Brevo\Client\Model\SendSmtpEmail;
use Exception;
use GuzzleHttp\Client;

class Email {
    private BrevoConfiguration $config;
    private TransactionalEmailsApi $apiInstance;

    public function __construct()
    {
        $this->config = BrevoConfiguration::getDefaultConfiguration()->setApiKey('api-key', $_ENV['BREVO_API_KEY']);
        $this->apiInstance = new TransactionalEmailsApi(
            new Client(),
            $this->config
        );
    }

    /**
     * @throws Exception
     */
    public function sendEmail($email, $emailReceiver, $subject, $body): void
    {
        $sendSMPTEmail = new SendSmtpEmail(
            [
                'sender' => [
                    'name' => $email,
                    'email' => $email,
                ],
                'to' => [
                    [
                        'email' => $emailReceiver,
                    ],
                ],
                'subject' => $subject,
                'htmlContent' => $body,
            ]
        );
        try{
            $this->apiInstance->sendTransacEmail($sendSMPTEmail);
        } catch (ApiException $e) {
            throw new ApiException($e->getMessage());
        }
    }
}
