<?php

namespace App\Service;
use Brevo\Client\Api\TransactionalEmailsApi;
use Brevo\Client\ApiException;
use Brevo\Client\Configuration as BrevoConfiguration;
use Brevo\Client\Model\SendSmtpEmail;
use Exception;
use GuzzleHttp\Client;
use App\Entity\User;

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
    public function sendEmail($emailFrom, $emailTo, $subject, $body): void
    {
        $sendSMPTEmail = new SendSmtpEmail(
            [
                'sender' => [
                    'name' => $emailFrom,
                    'email' => $emailFrom,
                ],
                'to' => [
                    [
                        'email' => $emailTo,
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

    public function sendWelcomeEmail(string $emailTo, string $name)
    {
        $emailFrom = $_ENV['EMAIL_FROM'];
        $subject = 'Bienvenue';
        $body = 'Bonjour '.$name.',<br><br> Bienvenue chez NOM';

        $this->sendEmail($emailFrom, $emailTo, $subject, $body);
    }

    public function sendResetPasswordEmail(string $emailTo, string $name, string $token)
    {
        $emailFrom = $_ENV['EMAIL_FROM'];
        $subject = 'Réinitialisation de mot de passe';
        $body = 'Bonjour '.$name.',<br><br> Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous : <br><br> <a href="https://localhost/auth/reset-password/validate/'.$token.'">Réinitialiser le mot de passe</a>';

        $this->sendEmail($emailFrom, $emailTo, $subject, $body);
    }

    public function sendNewProviderEmail(array $adminEmails, string $name, int $requestId)
    {
        $emailFrom = $_ENV['EMAIL_FROM'];
        $subject = 'Nouvelle demande prestataire';
        $body = 'Bonjour,<br><br> Une nouvelle demande prestataire a été effectuée par '.$name.'. <br><br> <a href="https://localhost/provider-request/'.$requestId.'">Voir la demande</a>';

        foreach($adminEmails as $emailTo) {
            $this->sendEmail($emailFrom, $emailTo, $subject, $body);
        }
    }

    public function sendNewProviderConfimationEmail(string $emailTo, string $name)
    {
        $emailFrom = $_ENV['EMAIL_FROM'];
        $subject = 'Demande prestataire';
        $body = 'Bonjour '.$name.',<br><br> Votre demande prestataire a bien été prise en compte.';

        $this->sendEmail($emailFrom, $emailTo, $subject, $body);
    }

    public function sendReservationEmail(string $emailTo, string $name)
    {
        $emailFrom = $_ENV['EMAIL_FROM'];
        $subject = 'Réservation';
        $body = 'Bonjour '.$name.',<br><br> Votre réservation a bien été prise en compte.';

        $this->sendEmail($emailFrom, $emailTo, $subject, $body);
    }
}
