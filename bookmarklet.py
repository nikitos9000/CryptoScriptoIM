if __name__ == "__main__":
        with open("cryptoscripto.js") as script:
                import urllib
                print "javascript:%s" % urllib.quote(script.read())