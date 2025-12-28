// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificatNumerique {

    struct Certificat {
        string nom;
        string typeCertificat;
        string hashCertificat;
        uint256 dateEmission;
        address emetteur;
    }

    mapping(string => Certificat) private certificats;
    string[] private listeHashes;

    event CertificatEmis(
        string hashCertificat,
        string nom,
        string typeCertificat,
        address emetteur,
        uint256 dateEmission
    );

    function emettreCertificat(
        string memory _nom,
        string memory _typeCertificat,
        string memory _hashCertificat
    ) public {

        require(
            bytes(certificats[_hashCertificat].hashCertificat).length == 0,
            "Certificat deja existant"
        );

        certificats[_hashCertificat] = Certificat(
            _nom,
            _typeCertificat,
            _hashCertificat,
            block.timestamp,
            msg.sender
        );

        listeHashes.push(_hashCertificat);

        emit CertificatEmis(
            _hashCertificat,
            _nom,
            _typeCertificat,
            msg.sender,
            block.timestamp
        );
    }

    function verifierCertificat(string memory _hashCertificat)
        public
        view
        returns (
            string memory nom,
            string memory typeCertificat,
            uint256 dateEmission,
            address emetteur
        )
    {
        require(
            bytes(certificats[_hashCertificat].hashCertificat).length != 0,
            "Certificat inexistant"
        );

        Certificat memory cert = certificats[_hashCertificat];

        return (
            cert.nom,
            cert.typeCertificat,
            cert.dateEmission,
            cert.emetteur
        );
    }

    function getNombreCertificats() public view returns (uint256) {
        return listeHashes.length;
    }

    function getCertificatByIndex(uint256 index)
        public
        view
        returns (
            string memory nom,
            string memory typeCertificat,
            string memory hashCertificat,
            uint256 dateEmission,
            address emetteur
        )
    {
        require(index < listeHashes.length, "Index invalide");

        Certificat memory cert = certificats[listeHashes[index]];

        return (
            cert.nom,
            cert.typeCertificat,
            cert.hashCertificat,
            cert.dateEmission,
            cert.emetteur
        );
    }
}
