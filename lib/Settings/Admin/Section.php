<?php

declare(strict_types=1);

namespace OCA\Printer2\Settings\Admin;

use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Settings\IIconSection;

class Section implements IIconSection
{
    /**
     * @var IL10N
     */
    private $l;

    /**
     * @var IURLGenerator
     */
    private $url;

    public function __construct(IURLGenerator $url, IL10N $l)
    {
        $this->url = $url;
        $this->l = $l;
    }

    public function getIcon(): string
    {
        return $this->url->imagePath('printer2', 'app-dark.svg');
    }

    public function getID(): string
    {
        return 'printer2';
    }

    public function getName(): string
    {
        return $this->l->t('Printer2');
    }

    public function getPriority(): int
    {
        return 70;
    }
}
