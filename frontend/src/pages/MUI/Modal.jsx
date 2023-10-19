import Layout from "../../partials/dashboard/Layout";
import Card from "../../components/Card";
import WhoWonComponent from "../../partials/habit/WhoWon";
import Modal from "../../components/Modal";
import { useState } from "react";
import useHabits from "../../hooks/habit/useHabits";


export default function ModalPage() {

  //const [userWon, setUserWon] = useState(null);
  //// 使用 useHabits 獲得數據
  //const habitsData = useHabits();
//
  //useEffect(() => {
  //  if (habitsData) {
  //    const allChecked = habitsData.dateCheckList.every((date) => date.checked);
  //    setUserWon(allChecked);
  //  }
  //}, [habitsData]);  

  const userWon=true;
  
  return (
    <Layout>
      <div className="flex p-10">
        <Card className="flex-[1]" title="Full Screen Modal">
          <Modal size="xxl" title="" text="" buttonText="settle accounts">
            <WhoWonComponent userWon={userWon}/>
          </Modal>
        </Card>
      </div>
    </Layout>
  );
}
