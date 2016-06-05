# Alex 


## Comment l'idée nous est venue 
Lors de nos stages en entreprise, nous avons remarqué que les seules personnes qui prenaient des pauses de façon régulière étaient les fumeurs. Nous avons compris que leur avantage sur les autres est qu'il ont une excuse en béton pour prendre des pauses, socialiser. Et on constate que se déconnecter du travail pendant 15 minutes permet de mieux y revenir et de gagner en productivité.

## Pourquoi prendre des pauses ? 
- Augmente la productivité 
- Diminution du stress
- Meilleure santé physique 

## Les bienfaits d'Alex

Alex vous aide à assurer la productivité de vos employés en les encourageant à prendre des pauses régulières et efficaces. Plus besoin de fumer pour avoir une raison de prendre une pause !

# Brainstorming 
Nous avons utilisé un lean canvas afin de nous aider à avoir un brainstorm efficace. Cela nous a permis de bien identifier notre public cible ainsi que nos objectifs lors de la création de notre slack bot.


# Landing page 
Nous avons réalisé une landing page afin de présenter notre projet. La page est disponible [ici](http://mymoza.github.io/slackathon-alex/). 

# Comment utiliser notre robot 
Pour utiliser notre robot : 

1. Lors de votre connexion à Slack, Alex vous demandera si vous souhaitez aller marcher aujourd'hui.

2. Si vous êtes prêts à aller marcher, dites en message privé à Alex que vous souhaitez aller marcher. Deux options s'offrent à vous: `Je veux prendre une marche` qui vous assignera un collègue de façon aléatoire avec qui aller marcher, ou bien `Je veux aller marcher avec @Albert` Identifiez le nom de la personne avec qui vous souhaitez aller marcher. 

3. La personne que vous avez choisie pour aller marcher recevra un message de la part d'Alex lui proposant d'aller marcher. Celle-ci a le choix d'accepter ou de refuser. Si vous n'avez spécifié aucun collègue, alors une personne aléatoire recevra ce message. 

4. La personne invitée à prendre une marche aura le choix de répondre `Oui` ou `Non` à la question du bot qui lui demandera si c'est un bon moment pour lui/elle d'aller marcher.

5. Répétez ces étapes autant de fois que nécessaire afin de trouver un match qui vous correspond. 

# Comment installer le robot 

1. Faire un git clone du projet 

`git clone https://github.com/grindcore819/slackathonMTL.git`

2. Installez les dépendances nécessaires au bon fonctionnement du projet avec la commande suivante : 

`npm install`

2. Se créer un robot slack 
    1. Apps & Integration 
    2. Cliquer sur Manage en haut à droite 
    3. Sélectionner Custom Integrations, puis Bots
    4. Cliquer sur Add Configuration 
    5. Entrer le nom du robot 
    6. Récupérer la clé API Token et la conserver précieusement 

3. [Obtenir le Token](https://api.slack.com/docs/oauth-test-tokens) correspondant à la team Slack où vous désirez ajouter un bot 

4. À la ligne 3 du fichier `alex.js`, entrez le token du robot : 
    `process.env.token = "XXXXXXXXXXXXXXXXXXXXXXXX"`

5. À la ligne 22 du fichier `alex.js`, entrez le token de la team slack : 
`options = {
    'token' : 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX'
 };`

6. Pour exécuter votre robot, entrez la commande suivante dans un terminal : 
 
`token="XXXXXXXXXXXXXXXXXXXXX" node alex.js`

Avec le token correspondant à votre team slack. 

7. C'est tout !

## Quel Channel 

Le robot s'utilise en message privé uniquement. 

