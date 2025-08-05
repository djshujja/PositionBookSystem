import type { Position } from "../types";

interface Props {
  positions: Position[];
}

const PositionTable: React.FC<Props> = ({ positions }) => {
  return (
    <div>
      <h2>Position Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Security Code</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos, index) => (
            <tr key={index}>
              <td>{pos.account}</td>
              <td>{pos.securityCode}</td>
              <td>{pos.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionTable;
