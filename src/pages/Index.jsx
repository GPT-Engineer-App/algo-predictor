import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, HStack, IconButton } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [sequence, setSequence] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleAddNumber = () => {
    if (inputValue !== "") {
      setSequence([...sequence, parseInt(inputValue)]);
      setInputValue("");
    }
  };

  const handleClearSequence = () => {
    setSequence([]);
    setPrediction(null);
  };

  const handlePredict = () => {
    if (sequence.length < 2) {
      setPrediction("Need at least two numbers to predict.");
      return;
    }

    // Simple prediction algorithm: difference between last two numbers
    const diff = sequence[sequence.length - 1] - sequence[sequence.length - 2];
    const nextNumber = sequence[sequence.length - 1] + diff;
    setPrediction(nextNumber);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Sequence Predictor</Text>
        <HStack width="100%">
          <Input placeholder="Enter a number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <IconButton aria-label="Add number" icon={<FaPlus />} onClick={handleAddNumber} />
        </HStack>
        <Button colorScheme="red" onClick={handleClearSequence} leftIcon={<FaTrash />}>
          Clear Sequence
        </Button>
        <Button colorScheme="blue" onClick={handlePredict}>
          Predict Next Number
        </Button>
        {sequence.length > 0 && (
          <VStack spacing={2} width="100%">
            <Text>Sequence: {sequence.join(", ")}</Text>
            {prediction !== null && <Text>Prediction: {prediction}</Text>}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
