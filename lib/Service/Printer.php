<?php

namespace Service;
namespace OCA\Printer2\Service;

use Symfony\Component\Process\Process;

/**
 * class Printer2.
 *
 * @author Simon Vieille <simon@deblan.fr>
 */
class Printer2
{
    public function print(string $file, string $orientation)
    {
	if ($orientation == 'normal') {
		
	}
	if ($orientation == 'onac') {
		
	}
	else {
		
	}
/*
        $options = [
            'landscape' => [
                'lpr',
                $file,
            ],
            'portrait' => [
                'lpr',
                '-o',
                'orientation-requested=4',
                $file,
            ],
        ];

        $process = new Process($options[$orientation]);
        $process->mustRun();
*/
    }

    /**
     * Validates an orientation.
     */
    public function isValidOrientation(string $orientation): bool
    {
        return in_array($orientation, [
            'normal',
            'onac',
        ]);
    }
}
