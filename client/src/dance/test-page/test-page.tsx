import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAddDance } from "../api/use-add-dance";
import { useAddDancePattern } from "../api/use-add-dance-pattern";
import { useDeleteDance } from "../api/use-delete-dance";
import { useDeleteDancePattern } from "../api/use-delete-dance-pattern";
import { useGetDances } from "../api/use-get-dances";
import { useUpdateDance } from "../api/use-update-dance";
import { useUpdateDancePattern } from "../api/use-update-dance-pattern";

export const TestPage = () => {
  const { dances } = useGetDances();
  const { addDance } = useAddDance();
  const { updateDance } = useUpdateDance();
  const { deleteDance } = useDeleteDance();

  const { addDancePattern } = useAddDancePattern();
  const { updateDancePattern } = useUpdateDancePattern();
  const { deleteDancePattern } = useDeleteDancePattern();

  const [name, setName] = useState("");
  const [patternName, setPatternName] = useState("");
  const [selectedDanceId, setSelectedDanceId] = useState<number | null>(null);
  const [selectedPatternId, setSelectedPatternId] = useState<number | null>(
    null
  );

  return (
    <Stack mt={5}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        onClick={() => {
          const isEdit = selectedDanceId !== null;
          if (isEdit) {
            updateDance({ id: selectedDanceId, name });
          } else {
            addDance({ name });
          }
          setName("");
          setSelectedDanceId(null);
        }}
      >
        Submit dance
      </Button>
      <Divider sx={{ margin: 5 }} />
      <TextField
        label="Pattern name"
        value={patternName}
        onChange={(e) => setPatternName(e.target.value)}
      />
      <Button
        onClick={() => {
          if (selectedDanceId === null) return;
          const isEdit = selectedPatternId !== null;
          if (isEdit) {
            updateDancePattern({
              id: selectedPatternId,
              danceId: selectedDanceId,
              name: patternName,
            });
          } else {
            addDancePattern({ name: patternName, danceId: selectedDanceId });
          }
          setPatternName("");
          setSelectedPatternId(null);
        }}
      >
        Submit pattern
      </Button>
      <List>
        {dances.map((dance) => (
          <ListItem key={dance.id}>
            <Card>
              <CardHeader title={dance.name} />
              <Divider />
              <CardContent>
                <List>
                  {dance.dancePatterns.map((pattern) => (
                    <ListItem key={pattern.id}>
                      <Typography>{pattern.name}</Typography>
                      <IconButton
                        onClick={() => {
                          setSelectedPatternId(pattern.id);
                          setPatternName(pattern.name);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteDancePattern(pattern.id)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <Divider />
              <CardActions>
                <IconButton
                  onClick={() => {
                    setSelectedDanceId(dance.id);
                    setName(dance.name);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton onClick={() => deleteDance(dance.id)}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};
