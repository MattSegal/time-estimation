import { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ProbabilityDistribution {
  timeValues: number[];
  probabilityMass: number[];
}

const HomePage = () => {
  const [timeValue, setTimeValue] = useState<number>(1);
  const [timeUnit, setTimeUnit] = useState<string>("days");
  const [probabilityDistribution, setProbabilityDistribution] =
    useState<ProbabilityDistribution>({
      timeValues: [],
      probabilityMass: [],
    });

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(Number(e.target.value));
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeUnit(e.target.value);
  };

  useEffect(() => {
    const newDistribution = calculateProbabilityDistribution(timeValue);
    setProbabilityDistribution(newDistribution);
  }, [timeValue]);

  const chartData = useMemo(() => {
    return probabilityDistribution.timeValues.map((tv, index) => ({
      time: parseFloat(tv.toFixed(2)),
      probability: parseFloat(
        probabilityDistribution.probabilityMass[index].toFixed(4)
      ),
    }));
  }, [probabilityDistribution]);

  const xAxisDomain = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return [0, 1];
    }
    const timeValues = chartData.map((d) => d.time);
    const maxDataTime = Math.max(...timeValues);
    return [0, Math.max(1, maxDataTime)];
  }, [chartData]);

  const xAxisIntegerTicks = useMemo(() => {
    const [, maxDomainValue] = xAxisDomain; // maxDomainValue is at least 1.
    const ticks: number[] = [];
    // Generate integer ticks from 1 up to the floor of the max domain value.
    // If maxDomainValue is 1 (e.g. data max was 0.5), loop is i=1 to 1. ticks = [1].
    // If maxDomainValue is 5.5, loop i=1 to 5. ticks = [1,2,3,4,5].
    for (let i = 1; i <= Math.floor(maxDomainValue); i++) {
      ticks.push(i);
    }
    return ticks;
  }, [xAxisDomain]);

  return (
    <Container>
      <h1 style={{ color: "red" }}>
        WARNING: I don't think these calcs are correct
      </h1>
      <Header>
        <h1>Time Estimation</h1>
        <p>
          Given a developer's estimated task completion time, this tool will
          calculate the probability of the task being completed in a given time.
        </p>
      </Header>
      <InputContainer>
        <StyledInput
          type="number"
          value={timeValue}
          onChange={handleTimeChange}
          placeholder="Enter time"
        />
        <StyledSelect value={timeUnit} onChange={handleUnitChange}>
          <option value="days">Days</option>
          <option value="hours">Hours</option>
          <option value="weeks">Weeks</option>
        </StyledSelect>
        <p>to complete the task</p>
      </InputContainer>
      {chartData.length > 0 && (
        <ChartContainer>
          <AreaChart
            width={800}
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              unit={timeUnit}
              domain={xAxisDomain}
              ticks={xAxisIntegerTicks}
              allowDecimals={false}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="probability"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ChartContainer>
      )}
    </Container>
  );
};

export default HomePage;

// P(t|m) = sqrt( exp( -1 * ( ln(t) - ln(m) )^2 ) / ( 2 * pi * t^2 ) )
const calculateProbabilityDistribution = (
  m: number // m is the timeValue, the developer's estimate
): ProbabilityDistribution => {
  if (m <= 0) {
    return { timeValues: [], probabilityMass: [] };
  }

  const timeValues: number[] = [];
  const probabilityMass: number[] = [];

  for (let i = 0; i < 6 * m; i += 0.1 * m) {
    const t = i;
    if (t === 0) {
      probabilityMass.push(0);
      timeValues.push(t);
    } else {
      const pdf = Math.sqrt(
        Math.exp(-1 * Math.pow(Math.log(t) - Math.log(m), 2)) /
          (2 * Math.PI * Math.pow(t, 2))
      );
      probabilityMass.push(pdf);
      timeValues.push(t);
    }
  }

  return { timeValues, probabilityMass };
};

const ChartContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const Header = styled.div`
  margin-bottom: 1rem;
  h1 {
    font-size: 2rem;
    margin-bottom: 0rem;
  }
  p {
    font-size: 1.2rem;
    margin: 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`;

const commonInputStyles = `
  background-color: var(--parchment);
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  color: var(--text-primary);
    outline: 2px solid var(--navy-light);

  &:focus {
    outline: 2px solid var(--navy-medium);
  }
`;

const StyledInput = styled.input`
  ${commonInputStyles}
  width: 150px;
`;

const StyledSelect = styled.select`
  ${commonInputStyles}
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230A1F44%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.4-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  padding-right: 2.5rem;
`;
