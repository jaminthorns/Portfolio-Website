## Grammar Parser

This is a project I made for a Foundations of Computer Science course in
university. The directions for the final assignment of the class were
essentially, "create a program that demonstrates something you've learned in the
class".

The program is a parser that can take any grammar (formatted in [Backus–Naur
Form](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_Form)), accept any
string of tokens, and then evaluate and display the derivation rules for that
string in relation to the grammar.

It was meant to be a proof-of-concept and learning exercise for me, so speed
wasn't a priority, and not many optimizations were made with the parsing
algorithm. Even still, it can serve as a useful tool for evaluating strings in
relatively simple grammars.

https://github.com/jaminthorns/grammar-parser

## ASCII Snake

ASCII Snake is just a simple Snake clone written using Python. It came from
having some downtime for a few afternoons as I was starting to learn Python.

It doesn't use any ASCII/terminal animation libraries. Instead, it just clears
the screen and redraws for animation, so there aren't any external dependencies.

The game starts out with a menu that gives you difficulty and size settings,
along with the option to have obstacles or not. When in the game, you have a
counter at the bottom to keep track of the score.

https://github.com/jaminthorns/ascii-snake

## CPU Cache Simulator

This is a tool to simulate the behavior of a generic CPU cache. It was made as a
final project for a Computer Architecture class to demonstrate knowledge of a
topic in the course.

Parameters that determine the behavior of the cache are supplied as command line
arguments. The most significant of these are the
[replacement](https://en.wikipedia.org/wiki/CPU_cache#Replacement_policies),
[write](https://en.wikipedia.org/wiki/CPU_cache#Write_policies), and [mapping
policies](https://en.wikipedia.org/wiki/CPU_cache#Associativity). When running
the simulator, you can read and write from memory, which indirectly modifies the
contents of the CPU cache. You can then display the contents of the cache to
observe how the different parameters affect its behavior.

This is of course a distilled and simplified simulation of how a computer's
memory and CPU cache interact, as real CPU caches involve plenty of
optimizations and nuances not present in this program. Nevertheless, it can be
used as a learning tool when demonstrating the basic concepts of how CPU a cache
works.

https://github.com/jaminthorns/cpu-cache-simulator

## Bayesian Spam Filter

This is a proof of concept email spam filter that implements [naive Bayes
classification](https://en.wikipedia.org/wiki/Naive_Bayes_classifier). It was
created as a final assignment for an Information Assurance and Security class.

When creating this, I didn't expect such a simple method of classification to be
so effective. I was able to reach success rates in the high 90% range for spam
and ham (non-spam) emails using [SpamAssassin's public corpus of
emails](https://spamassassin.apache.org/publiccorpus/). This method of email
filtering (with a few added enhancements) is what is used by essentially every
email filter today, as it's proven to be the most effective method to combat
spam emails.

I also included the paper and presentation that I wrote for the assignment in
the GitHub repository which gives an overview of how this method of spam
filtering works.

https://github.com/jaminthorns/spam-classifier
