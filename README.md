# EmojiDecoder

**EmojiDecoder** is a web app that allows users to decode emojis into their corresponding Unicode representations and descriptions. It also features a random emoji generator for sequences using ZWJ (Zero Width Joiner) and supports theme switching between light and dark modes. 🪻

## Features

- **Emoji Decoding**: Users can input any emoji into a text field, and EmojiDecoder will provide the exact Unicode representation and a clear description of the emoji from the Unicode Consortium's emoji data files.

- **Handling ZWJ Sequences and Their Components**: **Zero Width Joiner (ZWJ)** sequences are special combinations of emojis that are displayed as a single, composed emoji (such as family or flag emojis). EmojiDecoder supports the decoding of these complex sequences into their individual components and descriptions, allowing users to explore how each part contributes to the final composed emoji.

- **Random ZWJ Sequence Generator**: The app features a **random button**, which generates a random ZWJ sequence. This allows users to explore composed emojis they may not have encountered before, adding an element of discovery to the experience.

- **Special Unicode Characters**: EmojiDecoder includes special handling for specific Unicode characters, such as **Zero Width Joiner (ZWJ)**, **Variation Selector-16 (VS16)** for emoji display, and **Variation Selector-15 (VS15)** for text display. For these, the app provides an information button that links to relevant resources, allowing users to easily learn more about these characters.

- **Theme Switching**: EmojiDecoder supports both **light** and **dark themes**, automatically adjusting to the user's system preferences. Users can also manually toggle between themes via the theme switch in the navbar.

- **UTF-16 Handling**: Although the app does not explicitly use UTF-16, it indirectly relies on JavaScript's internal string representation, which is based on UTF-16. All string operations involving emojis are managed in this encoding format by default. This ensures correct handling of surrogate pairs, which are necessary for representing characters like emojis that go beyond the Basic Multilingual Plane (BMP).

## How the Decoding Process Works

1. **Input**: Users input any emoji or ZWJ sequence into the text field.
2. **UTF-16 Handling**: Internally, the emoji is processed using JavaScript’s native UTF-16 string encoding. The emoji sequence is then translated into its corresponding Unicode code points.
3. **Description**: The app retrieves the official description from Unicode data files, including the sequence's components (for ZWJ emojis).
4. **Display**: The decoded Unicode and description are displayed, alongside the input emoji for easy comparison.

## Unicode Data Files

This project uses the following emoji data files from Unicode:

- `emoji-test.txt` (Version 16.0, downloaded from [Unicode Emoji Test Data](https://unicode.org/Public/emoji/16.0/emoji-test.txt))
- `emoji-sequences.txt` (Version 16.0, downloaded from [Unicode Emoji Sequences](https://unicode.org/Public/emoji/16.0/emoji-sequences.txt))
- `emoji-zwj-sequences.txt` (Version 16.0, downloaded from [Unicode ZWJ Emoji Sequences](https://unicode.org/Public/emoji/16.0/emoji-zwj-sequences.txt))

### Unicode License

The Unicode Data Files used in this project are licensed under the Unicode License v3. You can find the Unicode License in the `/unicode/UNICODE_LICENSE.txt` file, or view it online at [Unicode License](https://www.unicode.org/license.html).  
For additional information on copyright, visit [Unicode's Copyright Page](https://www.unicode.org/copyright.html).

## Frameworks and Libraries

[DaisyUI](https://daisyui.com/)  
[TailwindCSS](https://tailwindcss.com/)
