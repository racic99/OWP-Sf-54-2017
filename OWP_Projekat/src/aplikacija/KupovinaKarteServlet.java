package aplikacija;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import baza.FilmDAO;
import baza.KartaDAO;
import baza.KorisnikDAO;
import baza.ProjekcijaDAO;
import baza.SalaDAO;
import baza.TipProjekcijeDAO;
import model.Film;
import model.Karta;
import model.Korisnik;
import model.Projekcija;
import model.Sala;
import model.TipProjekcije;

public class KupovinaKarteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String prijavljenKorisnikKorime = (String) request.getSession().getAttribute("prijavljenKorisnik");
		if (prijavljenKorisnikKorime == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		Korisnik prijavljenKorisnik = KorisnikDAO.getPrijavljen(prijavljenKorisnikKorime);
		if (prijavljenKorisnik == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		if(prijavljenKorisnik.getUloga().name().equals("ADMIN")){
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		
		String idProjekcije = request.getParameter("idProjekcije");
		Projekcija projekcija = ProjekcijaDAO.get(idProjekcije);
		
		List<Film> filmovi = FilmDAO.getSve();
		List<Sala> sale = SalaDAO.getAll();
		List<TipProjekcije> tipoviProjekcije = TipProjekcijeDAO.getAll();
		List<Projekcija> projekcije = ProjekcijaDAO.getAll();
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("prijavljenKorisnikKorime", prijavljenKorisnikKorime);
		data.put("tipoviProjekcije", tipoviProjekcije);
		data.put("sale", sale);
		data.put("filmovi", filmovi);
		data.put("projekcije", projekcije);
		data.put("projekcija", projekcija);
		
		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String prijavljenKorisnikKorime = (String) request.getSession().getAttribute("prijavljenKorisnik");
		
		String idProjekcije = request.getParameter("idProjekcije");
		String brojSedista = request.getParameter("sediste");
		
		int projekcija = Integer.parseInt(idProjekcije);
		int sediste = Integer.parseInt(brojSedista);

		
		SimpleDateFormat format = 
			     new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Calendar datumVreme = Calendar.getInstance();
			
			

		
		Karta karta = new Karta(0, projekcija, sediste, format.format(datumVreme.getTime()).toString().toString(), prijavljenKorisnikKorime);
		KartaDAO.add(karta);
		
		Map<String, Object> data = new LinkedHashMap<>();

		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
	}

}
