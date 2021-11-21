<?php

namespace OCA\Printer2\Controller;

use OCA\Printer2\Config;
use OCA\Printer2\Service\Printer2;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\IUserSession;
use Symfony\Component\Process\Exception\ProcessFailedException;

class Printer2Controller extends Controller
{
    /**
     * @var OC\L10N\LazyL10N
     */
    protected $language;

    /**
     * @var Printer2
     */
    protected $printer2;

    /**
     * @var Config
     */
    protected $config;

    public function __construct(string $appName, IRequest $request, Printer2 $printer2, Config $config)
    {
        parent::__construct($appName, $request);

        $this->language = \OC::$server->getL10N('printer2');
        $this->printer2 = $printer2;
        $this->config = $config;
    }

    /**
     * @NoAdminRequired
     */
    public function printfile(string $sourcefile, string $orientation): JSONResponse
    {
        $file = \OC\Files\Filesystem::getLocalFile($sourcefile);

        $success = [
            'response' => 'success',
            'msg' => $this->language->t('Print succeeded!'),
        ];

        $error = [
            'response' => 'error',
            'msg' => $this->language->t('Print failed'),
        ];

        $notAllowed = [
            'response' => 'error',
            'msg' => $this->language->t('User not allowed'),
        ];

        $user = \OC::$server[IUserSession::class]->getUser();

        if (!$user || $this->config->isDisabledForUser($user)) {
            return new JSONResponse($notAllowed);
        }

        if (!$this->printer2->isValidOrientation($orientation)) {
            return new JSONResponse($error);
        }

        try {
            $this->printer2->print($file, $orientation);

            return new JSONResponse($success);
        } catch (ProcessFailedException $exception) {
            return new JSONResponse($error);
        }
    }
}
