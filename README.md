# EmojiDecoder

**EmojiDecoder** is a simple web app that allows users to input and decode emojis into their corresponding Unicode representations and descriptions. It also features a random emoji generator and supports both light and dark themes.

## Frameworks and Libraries
[DaisyUI](https://daisyui.com/)  
[TailwindCSS](https://tailwindcss.com/)


## Unicode Data Files

This project uses the following emoji data files from Unicode:

- `emoji-test.txt` (Version 16.0, downloaded from [Unicode Emoji Test Data](https://unicode.org/Public/emoji/16.0/emoji-test.txt))
- `emoji-sequences.txt` (Version 16.0, downloaded from [Unicode Emoji Sequences](https://unicode.org/Public/emoji/16.0/emoji-sequences.txt))
- `emoji-zwj-sequences.txt` (Version 16.0, downloaded from [Unicode ZWJ Emoji Sequences](https://unicode.org/Public/emoji/16.0/emoji-zwj-sequences.txt))

### Unicode License

The Unicode Data Files used in this project are licensed under the Unicode License v3. You can find the Unicode License in the `/unicode/UNICODE_LICENSE.txt` file, or view it online at [Unicode License](https://www.unicode.org/license.html).  
For additional information on copyright, visit [Unicode's Copyright Page](https://www.unicode.org/copyright.html).

<!--
### Acknowledgements

Emoji data files are provided by [The Unicode Consortium](https://unicode.org). This project uses Unicode Data Files as permitted under the Unicode License v3. More information can be found on Unicode's [Copyright Page](https://www.unicode.org/copyright.html).
-->

## To Do:
- [x] Fix the isEmoji check
- [ ] Add Footer
- [x] Fix Header (add links)
- [x] Fix Background (theme?)
- [x] Add page name and icon
- [ ] Make the info table width static
- [x] Add emoji decription in the info table
- [x] zero-width-joiner
- [ ] Bug with emoji info 🫱🏾‍🫲🏽
- [ ] [U+FE0E and U+FE0F](https://stackoverflow.com/questions/38100329/what-does-u-ufe0f-in-an-emoji-mean-is-it-the-same-if-i-delete-it)