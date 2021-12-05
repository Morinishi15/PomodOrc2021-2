import React, {
  useContext, //Usaremos para aceitar um objeto de contexto (o valor retornado de React.createContext) e retorna o valor atual do contexto.
  useEffect, //Usaremos para aceitar uma função que contém um código imperativo.
  useRef, //Usaremos para manter alguns valor mutável em torno do código.
  useState, //Usaremos para retornar um valor/função para atualizar algum valor e definir nosso estado em nosso código.
  Dispatch, //Usaremos para despachar ações e acionar mudanças de estado.
  SetStateAction } from 'react';
import { func } from 'prop-types';

import useWindowSize from 'hooks/useWindowSize'; //Ajudar com a responsividade, com uma necessidade muito comum em obter o tamanho atual da janela do navegador. Este gancho retorna um objeto contendo a largura e altura da janela. 
import cyclesContext from 'contexts/cycles.context';
import { 
  remainingTimeInMinutes, //Tempo restante em minutos
  remainingTimeInSeconds } from 'utils/helpers'; //Tempo restante em segundos
import * as S from './Clock.style'; //Trazer o círculo do cronômetro e todo o seu style. 

type ClockProps = {
  setPomodOrcCycleType: Dispatch<SetStateAction<number>>, //Dispatch usado para assionar as mudanças de estado do estado inical do SetStateAction.
}
function Clock({ setPomodOrcCycleType }: ClockProps): JSX.Element {
  const { width } = useWindowSize();
  const orderedCycles = useContext(cyclesContext);

  const [remainingTime, setRemainingTime] = useState(orderedCycles[0].duration); //Declarando as constantes e pondo useState em todas elas.
  const [remainingMin, setRemainingMin] = useState<number | string>(0);
  const [remainingSecs, setRemainingSecs] = useState<number | string>(0);
  const [timeRunning, setTimeRunning] = useState(false);
  const [pomodOrcCycles, setPomodOrcCycles] = useState(0);
  const [scalePercentual, setScalePercentual] = useState(0);

  const pauseClock = () => setTimeRunning(false); //Booleano de que quando parar o relógio, o runing dele se torna falso, então ele para.
  const startClock = () => setTimeRunning(true); //booleano de que quando der start no relógio, o runing dele se torna verdadeiro, então ele volta a contar.
  const restartClock = () => { //QUando for resetar, ele pede esse update do ciclo do relógio e suas informações, para o relógio voltar a fazer o ciclo de 25/5/25/5/25/5/25/15
    cycleInformationUpdate(0);
    pauseClock();
    setPomodOrcCycles(0);
  };
  const cycleInformationUpdate = (pomodOrcCycle: number) => { //Declarar a constante cycleInformationUpdate pra ela suportar o pomodOrcCycle que descreve os valores que a variável pode ter, que no caso só é números.
    setRemainingTime(orderedCycles[pomodOrcCycle].duration); //Definindo setRemainingTime como uma ordem do ciclo, que é o nosso pomodoro, sendo isso tudo a duração.
    setPomodOrcCycleType(orderedCycles[pomodOrcCycle].type); 
  };

  const handleClick = () => { //Serve para clicar, manuseio do timing.
    setTimeRunning(!timeRunning); //Usamos o ! aqui como uma maneira de dizer ao compilador "esta expressão não pode ser null ou undefined aqui, então não reclame sobre a possibilidade de ser null ou undefined.".
  }

  React.useEffect(() => { //Contagem dos segundos, sendo passado de 1 por 1.
    if (timeRunning) {
      const interval = setInterval(() => { 
        setRemainingTime((previous) => {
          if (previous === 0) return previous;
          return previous - 1;
        });
      }, 2);
      //Agendamos um novo intervalo para ser executado a cada segundo dentro do gancho useEffect. Isso será agendado assim que o componente React for montado pela primeira vez. Para limpar o intervalo corretamente, retornamos clearInterval do gancho useEffect, passando o intervalo.
      return () => clearInterval(interval);
    }
  }, [timeRunning]);

  React.useEffect(() => { //COntagem dos segundos, sendo passado de 1 por 1.
    if (timeRunning) {
      /*
      if (remainingTime==1500) {

        return () => alert("Intervalo");

      } else if (remainingTime==300) {

        return () => alert("Fim do Intervalo Curto");

      } else if (remainingTime==900) {

        return () => alert("Fim do Intervalo Longo");

      }
      
      return () => alert("Pomodorc pausado ou alterado");
      */
      //Agendamos um novo intervalo para ser executado a cada segundo dentro do gancho useEffect. Isso será agendado assim que o componente React for montado pela primeira vez. Para limpar o intervalo corretamente, retornamos clearInterval do gancho useEffect, passando o intervalo.
    }
  }, [timeRunning]);

  useEffect(() => {
    setRemainingMin(remainingTimeInMinutes(remainingTime));
    setRemainingSecs(remainingTimeInSeconds(remainingTime));
    setScalePercentual( (100 - (remainingTime * 100 / orderedCycles[pomodOrcCycles].duration)) / 100 );
    //Definindo o tempo restante dos minutos e dos segundos com a constante do helpers, dizendo que as duas fazem parte do remeaning time.
    const cycleEnded = remainingTime === 0;
    if (cycleEnded) {
      pauseClock();
      setPomodOrcCycles(previousState => previousState + 1);
      //Quando o ciclo acabar, o tempo restante é = 0, então o relógio para e muda o estado pra +1.
    }
  }, [remainingTime]);

  useEffect(() => {
    //Definimos os ciclos do relógio, dando que o primeiro ciclo é menor que 1, e que deve resetar esse ciclo quando ele tiver completado os 5 ciclos.
    const firstCycle = pomodOrcCycles < 1;
    const shouldRestart = pomodOrcCycles > 5;

    if (!firstCycle) { //Se a primeira cena não retornar nada, reseta o ciclo até ele enviar algo.
      if (shouldRestart) {
        restartClock();
        return;
      } 
      cycleInformationUpdate(pomodOrcCycles);
      startClock();
      //Atualiza a informação do ciclo do pomodoro e faz o relógio dar play depois de atualizar seus ciclos.
    }
  }, [pomodOrcCycles]);

  const scaleRef = useRef<HTMLDivElement>(null);
  const [scaleCircleDiameter, setScaleCircleDiameter] = useState<number>(0);
  const [scaleCircleRadius, setScaleCircleRadius] = useState<number>(0);

  const setScaleDimensions = () => {
    if (!scaleRef.current || !scaleRef.current.clientWidth) return;
    const scaleWrapperWidth = scaleRef.current.clientWidth;
    setScaleCircleDiameter(scaleWrapperWidth - 40);
    setScaleCircleRadius(scaleCircleDiameter / 2);
  };

  useEffect(() => {
    setScaleDimensions();
  }, [scaleRef.current, width]);
  //Parte que encontramos na internet de como fazer o timer ser do formato circular.

  return (
    <S.ClockWrapper>
      <S.Frame>
        <S.Inside>
          <S.Content>
            <S.Time
              fontSizeInPixels={Math.round(scaleCircleDiameter / 3.33)}
            >
              {`${remainingMin}:${remainingSecs}`}
            </S.Time>
            <S.Button
              fontSizeInPixels={Math.round(scaleCircleDiameter / 12)}
              marginTop={Math.round(scaleCircleDiameter * 0.03)}
              onClick={handleClick}
            >
              { timeRunning ? 'Pause' : 'Start' }
            </S.Button>
          </S.Content>
          <S.Gauge
            circleDiameter={scaleCircleDiameter}
            percentualPassed={scalePercentual}  
            ref={scaleRef}
          >
            { scaleCircleRadius > 0 && (
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r={scaleCircleRadius}/>
              </svg>
            )}
          </S.Gauge>
        </S.Inside>
      </S.Frame>
    </S.ClockWrapper>
  );
}
//Parte que encontramos na internet de como fazer o timer ser do formato circular.

Clock.propTypes = {
  setPomodOrcCycleType: func,
}

export default Clock;