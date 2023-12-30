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
    // TODO : change email when we have a name
    public static string $emailFrom = 'email@email.fr';

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

    public function sendWelcomeEmail(string $emailTo, string $name, string $token)
    {
        $subject = 'Bienvenue';
        $body = 'Bonjour '.$name.',<br><br> Bienvenue chez NOM DU SITE.<br><br> Pour confirmer votre adresse email, veuillez cliquer sur le lien ci-dessous : <br><br> <a href="http://localhost:8080/auth/confirm-email/'.$token.'">Confirmer l\'adresse email</a>';
        $this->sendEmail(Email::$emailFrom, $emailTo, $subject, $body);
    }

    public function sendEmailIsConfirmed(string $emailTo, string $name)
    {
        $subject = 'Adresse email confirmée';
        $body = 'Bonjour '.$name.',<br><br> Votre adresse email a bien été confirmée.';
        $this->sendEmail(Email::$emailFrom, $emailTo, $subject, $body);
    }

    public function sendResetPasswordEmail(string $emailTo, string $name, string $token)
    {
        $subject = 'Réinitialisation de mot de passe';
        $body = 'Bonjour '.$name.',<br><br> Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous : <br><br> <a href="https://localhost/auth/reset-password/validate/'.$token.'">Réinitialiser le mot de passe</a>';
        $this->sendEmail(Email::$emailFrom, $emailTo, $subject, $body);
    }

    public function sendRequestProviderEmail(array $admins, string $name, string $requestId)
    {
        $subject = 'Nouvelle demande prestataire';
        $body = 'Bonjour,<br><br> Une nouvelle demande prestataire a été effectuée par '.$name.'.<br><br> Pour la consulter, veuillez cliquer sur le lien ci-dessous : <br><br> <a href="http://localhost:8080/admin/requests/'.$requestId.'">Consulter la demande</a>';


        foreach($admins as $admin) {
            $emailTo = $admin->getEmail();
            $this->sendEmail(Email::$emailFrom, $emailTo, $subject, $body);

        }
    }

    public function sendProviderConfimationEmail(string $emailTo, string $name)
    {
        $subject = 'Demande prestataire';
        $body = 'Bonjour '.$name.',<br><br> Votre demande prestataire a bien été prise en compte.';
        $this->sendEmail(Email::$emailFrom, $emailTo, $subject, $body);
    }

    public function sendProviderAcceptedEmail(string $emailTo, string $name)
    {
        $subject = 'Demande prestataire';
        $body = 'Bonjour '.$name.',<br><br> Votre demande prestataire a été acceptée.';
        $this->sendEmail(Email::$emailFrom, $emailTo, $subject, $body);
    }

    public function sendProviderRejectedEmail(string $emailTo, string $name)
    {
        $subject = 'Demande prestataire';
        $body = 'Bonjour '.$name.',<br><br> Votre demande prestataire a été refusée.';
        $this->sendEmail(Email::$emailFrom, $emailTo, $subject, $body);
    }

    public function sendReservationEmail(string $emailTo, string $name)
    {
        $subject = 'Réservation';
        $body = 'Bonjour '.$name.',<br><br> Votre réservation a bien été prise en compte.';
        $this->sendEmail(Email::$emailFrom, $emailTo, $subject, $body);
    }
}
