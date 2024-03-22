import Experience from "../Experience";
import Environment from "./Environment";
import Ground from "./Ground";
import Smokebomb from "./Smokebomb";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources to be loaded
    this.resources.on("ready", () => {
      // Setup
      this.ground = new Ground();
      this.smokebomb = new Smokebomb();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.smokebomb) this.smokebomb.update();
  }
}
