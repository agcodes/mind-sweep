import DrawingComponent from 'addon-canvas/components/drawing-component';

export default class ColorsGameC extends DrawingComponent {


    isPointInRotatedSquare(px, py, square) {
        // Fonction pour vérifier si deux vecteurs sont dans le même sens
        function crossProduct(v1, v2) {
            return v1.x * v2.y - v1.y * v2.x;
        }

        // Crée des vecteurs pour chaque côté du carré et le point
        for (let i = 0; i < 4; i++) {
            const p1 = square[i];
            const p2 = square[(i + 1) % 4]; // Prochain sommet
            const edgeVector = { x: p2.x - p1.x, y: p2.y - p1.y };
            const pointVector = { x: px - p1.x, y: py - p1.y };

            // Vérifie le produit vectoriel
            if (crossProduct(edgeVector, pointVector) < 0) {
                return false; // Le point est à l'extérieur d'un côté
            }
        }

        return true; // Le point est à l'intérieur
    }
    displayScore() {
        const element = document.getElementById('span-nb-points');
        if (element) {
            element.innerHTML = `${this.score} / ${this.plays}`;
        }
    }
    displayLevel() {
        const element = document.getElementById('span-level');
        if (element) {
            element.innerHTML = `Level ${this.level}`;
        }
    }
}