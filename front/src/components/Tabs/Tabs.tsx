import React from 'react';
import { number } from 'prop-types';

import * as S from './Tabs.style';

var repeat = 1;
var repeatShortBreak = 1;
var repeatLongBreak = 1;

type TabsProps = {
  activeItem: number,
}

function Tabs({ activeItem }: TabsProps): JSX.Element {
  
  if (activeItem == 1) {

    if (repeat%2==0 && repeat!=2) {
      alert("Pomodoro")
      repeat += 1;
    } else {
      repeat += 1;
    }

  } else if (activeItem == 2){

    if (repeatShortBreak%2==0){
      alert("Inicio do Intervalo Curto")
      repeatShortBreak+=1;
    } else {
      repeatShortBreak+=1;
    }

  } else if (activeItem == 3){
    
    if (repeatShortBreak%2==0){
      alert("Inicio do Intervalo Longo")
      repeatLongBreak+=1;
    } else {
      repeatShortBreak+=1;
    }
  };
  
  return (
    
    <S.TabsWrapper>
      <S.Tabs positionOfActiveItem={activeItem}>
        <S.Tab>
          Pomodoro
        </S.Tab>
        <S.Tab>
          Pausa Curta
        </S.Tab>
        <S.Tab>
          Pausa Longa
        </S.Tab>
      </S.Tabs>
    </S.TabsWrapper>
  );
}

Tabs.propTypes = {
  activeItem: number,
}

export default Tabs;
