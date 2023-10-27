<?php

namespace App\Service;
use Resend;

class Email{
  public Resend $resend;

  public function __construct()
  {
    $this->resend = new Resend();
    $this->resend::client($_ENV['API_MAIL_KEY']);
  }

  public function sendEmail($email, $name, $subject, $body): void
  {
      try {
           $this->resend->emails->send([
              'from' => 'Acme <onboarding@resend.dev>',
              'to' => ['maxime.pietrucci@gmail.com'],
              'subject' => 'Hello world',
              'html' => '<strong>It works!</strong>',
          ]);
      } catch (\Exception $e) {
          exit('Error: ' . $e->getMessage());
      }
    }
}
