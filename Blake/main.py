# Genetic Algorithm to find word of user's choice
# 
# By Dalynn Hatch

import random
import os

# Set variables
desiredWord = input("Enter desired Word: ")
popSize = int(input("Enter a population size: "))
mutationPercent = int(input("Enter a percent chance that a mutation will occur: "))
finished = False

# Generate a word of correct length
def generateWord(length):
    i = 0
    word = ""
    
    while i < length:
        letter = chr(97 + int(26 * random.random()))
        word += letter
        i += 1
    return word

# Generate a population array
def generatePop(length, size):
    i = 0
    population = []

    while i < size:
        population.append(generateWord(length))
        i += 1
    return population

# Run through population and mutate random letters    
def mutation(percent, population):
    mutatedPop = []
    i = 0

    while i < len(population):
        j = 0
        word = population[i]

        while j < len(word):
            letter = chr(97 + int(26 * random.random()))
            randomNum = int(100 * random.random())
            if randomNum <= percent:
                word = word[0:j] + letter + word[j+1:len(word)]
            j += 1
        
        mutatedPop.append(word)
        i += 1
    return mutatedPop

# Calculate fitness of each word in population
def calculateFitness(finalWord, testWord):
    i = 0
    score = 0

    while i < len(finalWord):
        if finalWord[i] == testWord[i]:
            score += 1
        i+=1

    return int(score * 100 / len(finalWord))

# Calculate fitness for population
def fitness(population):
    i = 0
    fitnessScore = []
    score = 0

    while i < len(population):
        score = calculateFitness(desiredWord, population[i])
        fitnessScore.append(score)
        i += 1
    
    return fitnessScore

# Create the mating class
def createMatingClass(population, fitness):
    matingPopulation = []
    i = 0
    while i < len(population):
        j = 0
        if fitness[i] == 0:
            matingPopulation.append(population[i])
        else:
            while j < fitness[i]:
                matingPopulation.append(population[i])
                j += 1
        i += 1

    return matingPopulation

# Make children and create new population
def createNewPop(matingClass, popSize):
    i = 0
    newPopulation = []
    while i < popSize:
        choice1 = int(random.random() * len(matingClass))
        choice2 = int(random.random() * len(matingClass))
        parent1 = matingClass[choice1]
        parent2 = matingClass[choice2]
        
        word = parent1
        j = 0
        
        while j < len(parent1):
            if random.random() < .5:
                word = word[0:j] + parent2[j] + word[j+1:len(word)]
            j += 1
        newPopulation.append(word)
        i += 1
    return newPopulation

# Checking to see if finished
def checkFinish(pop, finalWord):
    i = 0
    done = False
    while i < len(pop):
        if pop[i] == finalWord:
            done = True
        i += 1
    return done

# Print the word with the highest fitness score
def printHighest(pop, fit):
    i = 0
    score = 0
    while i < len(pop):
        if score <= fit[i]:
            word = pop[i]
            score = fit[i]
        i += 1
    print("The word with highest fitness so far is " + word)
        

#################################### Main Start
population = generatePop(len(desiredWord), popSize)
fitnessScore = fitness(population)
matingClass = createMatingClass(population, fitnessScore)
newPopulation = createNewPop(matingClass, popSize)
newPopulation = mutation(mutationPercent, newPopulation)
totalGenerations = 1

while not finished:
    
    # Calculate fitness of population
    fitnessScore = fitness(newPopulation)
    # Create mating class
    matingClass = createMatingClass(newPopulation, fitnessScore)

    # Choose parents and make children
    newPopulation = createNewPop(matingClass, popSize)

    #Mutation
    newPopulation = mutation(mutationPercent, newPopulation)
    
    # Calculate fitness of population
    fitnessScore = fitness(newPopulation)
    
    # Print out population and highest fitness word in population
    printHighest(newPopulation, fitnessScore)
    print(newPopulation)
    print("")
    print(totalGenerations)
    totalGenerations += 1

    # Check if finished
    finished = checkFinish(newPopulation, desiredWord)
    #os.system('clear')

printHighest(newPopulation, fitnessScore)
print(newPopulation)
print("")
print(totalGenerations)
##################################### Main End