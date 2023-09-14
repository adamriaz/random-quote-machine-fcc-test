import { useCallback, useEffect, useState } from "react";
import { getQuotes } from "./Api";
import { IQuote } from "./Quote.interface";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material";

interface IQuoteProps {
  selectRandomColor: () => void;
  colorStyles: SxProps<Theme>;
}
export default function Quote(props: IQuoteProps) {
  const { selectRandomColor, colorStyles } = props;
  const [quoteText, setQuoteText] = useState("");
  const [author, setAuthor] = useState("");
  const [quotes, setQuotes] = useState<IQuote[]>([]);
  const [tweetUrl, setTweetUrl] = useState("");
  const findNewQuote = useCallback(() => {
    if (quotes) {
      const randomQuote: IQuote =
        quotes[Math.floor(Math.random() * quotes.length)];
      setQuoteText(randomQuote?.quote);
      setAuthor(randomQuote?.author);
      selectRandomColor();
      setTweetUrl(
        `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${randomQuote?.quote} ${randomQuote?.author}`
      );
    }
  }, [quotes, selectRandomColor]);

  const loadQuotes = useCallback(async () => {
    try {
      const data: IQuote[] = await getQuotes();
      if (data) {
        setQuotes(data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (quotes.length > 0 && quoteText === "" && author === "") {
      findNewQuote();
    }
  }, [quotes, quoteText, author, findNewQuote]);

  useEffect(() => {
    if (quotes.length === 0) {
      loadQuotes();
    }
  }, [quotes, loadQuotes]);

  return (
    <Card
      id="quote-box"
      sx={{
        p: 3,
        width: "33%",
        m: "auto",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Typography id="text" variant="h5">
        <i className="fa-solid fa-quote-left"> </i> {quoteText}
      </Typography>
      <Typography id="author" variant="body1" textAlign="right">
        - {author}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3
        }}
      >
        <Button
          id="tweet-quote"
          variant="contained"
          type="button"
          sx={colorStyles}
          href={tweetUrl}
          target="_blank"
        >
          <i className="fa-brands fa-square-x-twitter fa-2x"></i>
        </Button>
        <Button
          id="new-quote"
          variant="contained"
          sx={colorStyles}
          type="button"
          onClick={() => findNewQuote()}
        >
          New Quote
        </Button>
      </Box>
    </Card>
  );
}
