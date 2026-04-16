---
title: Machine Learning Basics
createTime: 2026/04/16 15:30:00
permalink: /en/machine-learning-basics/
---

# Machine Learning Basics

## What this lesson solves

The previous lesson explained what AI is. This lesson explains how a model learns. Once you understand inputs, labels, training, validation, and generalization, later discussions about large models, agent evaluation, or onchain risk systems become much easier to reason about.

## A minimal workflow

Most Machine Learning workflows can be reduced to five steps:

1. Define the task: what exactly should the system predict?
2. Prepare the data: collect inputs and add labels when needed.
3. Train the model: adjust parameters to reduce error.
4. Validate the model: check performance on unseen data.
5. Deploy and iterate: connect the model to real usage and monitor it.

## Supervised vs. unsupervised learning

### Supervised learning

Supervised learning uses labeled data.  
Examples:

- an email labeled as spam or not spam
- a transaction labeled as fraudulent or normal

The model learns the relationship between the input and the desired answer.

### Unsupervised learning

Unsupervised learning does not rely on explicit labels. It tries to discover structure inside the data.  
Examples:

- grouping users into similar clusters
- identifying unusual transaction patterns

## Training set, validation set, and test set

These datasets serve different roles and should not be mixed.

### Training set

The training set is used to learn model parameters. It contains the examples the model directly sees during learning.

### Validation set

The validation set helps compare approaches and tune settings during development.

### Test set

The test set should be saved for the end. It is not a development aid. It is the final check on whether the model generalizes well.

## What overfitting means

Overfitting means the model has learned the training data too specifically and performs worse on new data.

Typical signs include:

- very high training accuracy
- clearly worse validation or test performance

That usually means the model learned noise in addition to useful patterns.

## Features, labels, and objectives

### Features

Features are the inputs available to the model, for example:

- wallet age
- transaction frequency
- asset balance changes
- keywords in text

### Labels

Labels are the answers the model is expected to predict.

### Objective function

The objective function measures how wrong the model currently is. Training is the process of reducing that error.

## Why data quality matters more than model branding

Many projects do not fail because the model is outdated. They fail because the data pipeline is weak:

- labels are inconsistent
- the dataset does not match real-world usage
- sampling is biased
- the training data is stale

This becomes even more visible in Web3. Onchain data is public, but it is not automatically ready for learning. The task still has to be defined, the noise has to be cleaned, and useful features have to be constructed.

## A practical AI × Web3 example

Suppose you want to identify whether an address behaves like an airdrop hunter. A simple supervised setup might look like this:

- input features: number of protocols used, interaction frequency, bridge count, gas behavior, wallet age
- label: whether analysts previously classified the address as an airdrop hunter
- output: the probability that the address belongs to that class

The hard part is rarely the model choice. The hard part is:

- defining what “airdrop hunter” means
- constructing trustworthy labels
- avoiding false positives on normal users

## Minimum takeaway

After this lesson, you should be able to explain:

- the difference between supervised and unsupervised learning
- why training, validation, and test sets should not be mixed
- what overfitting means
- why data quality often matters more than the model name

## What comes next

The next lesson introduces Deep Learning. The focus is not mathematical derivation, but understanding why neural networks became so powerful and how modern large models fit into that story.
