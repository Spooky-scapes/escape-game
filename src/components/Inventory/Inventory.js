import "../../main.scss";
import itemBox from "./inventory.png";

const Inventory = () => {
  return (
    <div className="inventory">
      <img
        className="itemBox"
        src={itemBox}
        alt="Three boxes that are for your inventory"
      ></img>
    </div>
  );
};

export default Inventory;
