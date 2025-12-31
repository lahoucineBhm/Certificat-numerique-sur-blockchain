// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificatNumerique {
    struct Certificat {
        string nom;
        string typeCertificat;
        string hashCertificat;
        uint256 dateEmission;
        uint256 dateExpiration;
        address emetteur;
    }

    // 0 = inexistant, 1 = valide, 2 = expire
    enum Statut {
        INEXISTANT,
        VALIDE,
        EXPIRE
    }

    mapping(string => Certificat) private certificats;
    string[] private historique;

    event CertificatEmis(
        string indexed hashCertificat,
        address indexed emetteur,
        uint256 dateEmission,
        uint256 dateExpiration,
        string nom,
        string typeCertificat
    );

    //la fonction emettreCertificat
    
    function emettreCertificat(
        string memory _nom,
        string memory _typeCertificat,
        string memory _hashCertificat,
        uint256 _dateExpiration
    ) external {
        require(bytes(certificats[_hashCertificat].hashCertificat).length == 0, "Certificat deja existant");
        require(_dateExpiration > block.timestamp, "Date d'expiration invalide");

        Certificat memory c = Certificat({
            nom: _nom,
            typeCertificat: _typeCertificat,
            hashCertificat: _hashCertificat,
            dateEmission: block.timestamp,
            dateExpiration: _dateExpiration,
            emetteur: msg.sender
        });

        certificats[_hashCertificat] = c;
        historique.push(_hashCertificat);

        emit CertificatEmis(_hashCertificat, msg.sender, c.dateEmission, c.dateExpiration, _nom, _typeCertificat);
    }


    // la fonction verifierCertificat

    function verifierCertificat(string memory _hashCertificat)
        external
        view
        returns (
            bool existe,
            bool valide,
            Statut statut,
            uint256 tempsRestantSecondes,
            string memory nom,
            string memory typeCertificat,
            uint256 dateEmission,
            uint256 dateExpiration,
            address emetteur
        )
    {
        Certificat memory c = certificats[_hashCertificat];

        // inexistant
        if (bytes(c.hashCertificat).length == 0) {
            return (
                false,
                false,
                Statut.INEXISTANT,
                0,
                "",
                "",
                0,
                0,
                address(0)
            );
        }

        // existe
        existe = true;
        nom = c.nom;
        typeCertificat = c.typeCertificat;
        dateEmission = c.dateEmission;
        dateExpiration = c.dateExpiration;
        emetteur = c.emetteur;

        if (block.timestamp <= c.dateExpiration) {
            valide = true;
            statut = Statut.VALIDE;
            tempsRestantSecondes = c.dateExpiration - block.timestamp;
        } else {
            valide = false;
            statut = Statut.EXPIRE;
            tempsRestantSecondes = 0;
        }
    }


    //la fonction d'Historique complet (liste des hashes)

    function getHistorique() external view returns (string[] memory) {
        return historique;
    }
}