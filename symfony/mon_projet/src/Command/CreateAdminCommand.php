<?php

namespace App\Command;

use App\Service\AuthService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'create:admin',
    description: 'create new admin user',
)]
class CreateAdminCommand extends Command
{
    public function __construct( private AuthService $authService)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('name', InputArgument::OPTIONAL, 'Admin name')
            ->addArgument('firstName', InputArgument::OPTIONAL, 'Admin firstname')
            ->addArgument('email', InputArgument::OPTIONAL, 'Admin email')
            ->addArgument('address', InputArgument::OPTIONAL, 'Admin address')
            ->addArgument('password', InputArgument::OPTIONAL, 'Admin password')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $name = $input->getArgument('name');
        $firstName = $input->getArgument('firstName');
        $email = $input->getArgument('email');
        $address = $input->getArgument('address');
        $password = $input->getArgument('password');

        $res = $this->authService->newUser(
            compact('name', 'firstName', 'email', 'address', 'password'),
            true
        );

        if(!$res['success']){
            $io->error($res['errors']);
            return Command::FAILURE;
        }

        $io->success('Le nouvel admin a été créé avec succès.');

        return Command::SUCCESS;
    }
}
