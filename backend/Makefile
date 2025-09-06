# Makefile for Student Management System

CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -I./include
SRCDIR = src
INCDIR = include
OBJDIR = obj
BINDIR = bin

# Create directories if they don't exist
$(shell mkdir -p $(OBJDIR) $(BINDIR))

SOURCES = $(wildcard $(SRCDIR)/*.cpp)
OBJECTS = $(SOURCES:$(SRCDIR)/%.cpp=$(OBJDIR)/%.o)
TARGET = $(BINDIR)/sms

.PHONY: all clean run

all: $(TARGET)

$(TARGET): $(OBJECTS)
	$(CXX) $(OBJECTS) -o $@

$(OBJDIR)/%.o: $(SRCDIR)/%.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -rf $(OBJDIR) $(BINDIR)

run: $(TARGET)
	cd .. && ./backend/$(TARGET)

# For Windows
run-win: $(TARGET)
	cd .. && backend\\bin\\sms.exe

install:
	@echo "Installing dependencies..."
	@echo "Make sure you have g++ compiler installed"

help:
	@echo "Available targets:"
	@echo "  all     - Build the SMS application"
	@echo "  clean   - Remove build files"
	@echo "  run     - Build and run the application (Linux/Mac)"
	@echo "  run-win - Build and run the application (Windows)"
	@echo "  help    - Show this help message"